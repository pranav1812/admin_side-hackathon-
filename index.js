const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let geo = document.createElement('span');
    let status = document.createElement('span');
    let link=document.createElement('a');

    let type = document.createElement('span');
    let  urgency= document.createElement('span');
    let time = document.createElement('span');
    link.href=doc.data().url;

    var link_text=document.createTextNode('view image');
    link.appendChild(link_text);

    let btn=document.createElement('button');

    var text=document.createTextNode('update');
    li.setAttribute('data-id', doc.id);
    geo.textContent = 'Location:    '+doc.data().geo;
    type.textContent = 'Type:   '+doc.data().type;
    urgency.textContent ='Urgency:  '+ doc.data().urgency;
    time.textContent = 'Time:   '+doc.data().time_s;



    var select=document.createElement('select');
    var opt=document.createElement('option');
    var txt=document.createTextNode('Not Seen');
    opt.append(txt);
    select.append(opt);
    var opt=document.createElement('option');
    var txt=document.createTextNode('Rejected');
    opt.append(txt);
    select.append(opt);
    var opt=document.createElement('option');
    var txt=document.createTextNode('Resolved');
    opt.append(txt);
    select.append(opt);

    select.style.height=35;





    status.textContent = 'Status:   '+doc.data().status;
    btn.append(text);
    btn.style.height='35';


    li.appendChild(geo);
    li.appendChild(status);
    li.appendChild(select);
    li.appendChild(btn);
    li.appendChild(type);
    li.appendChild(urgency);
    li.appendChild(time);
    li.appendChild(link);


    btn.addEventListener('click',function(){
        db.collection('reports').doc(doc.id).update({
            status: select.value
        })
    });


    cafeList.appendChild(li);
}

//getting data
db.collection('reports').orderBy('time_s').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});
