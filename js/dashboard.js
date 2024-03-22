
const mypic=()=>{
    const myimg_input=document.getElementById('img_input').files[0];
    const myimg=document.getElementById('myimg_post')
    document.getElementById('myimg_post').style.display='block'
    const reader=new FileReader();
    reader.readAsDataURL(myimg_input);
    reader.addEventListener('load',function(){
        myimg.src=reader.result
    })
}
myall_post=[];

// Creating a new post
document.getElementById('save_post').addEventListener('click',function(e){

    e.preventDefault();
    let p_title=document.getElementById('post_title').value;
    let p_details=document.getElementById('post_details').value;
    let img_input=document.getElementById('img_input').value;
    let myimg=document.getElementById('myimg_post').src;
    let myobj={title:p_title,content:p_details,image:myimg};
    const cookie = document.cookie.split('=')[1];
    fetch('http://localhost:2100/myapi/blog',{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "credentials":`${cookie}`
        },
        body:JSON.stringify(myobj)
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data)
        mypages('all_dashboard_post')
        
    })
    .catch((error)=>{
        console.log(error)
    })
    
 
})




// Getting all blogs
const display_blogs=()=>{
    
    document.getElementById('all_blogs').innerHTML=''
    let blogs= [];

    fetch('http://localhost:2100/myapi/blog')
    .then((response)=>{
        return response.json()
    }).then((data)=>{
        blogs=data.data
        console.log(blogs);
        if(blogs != ''){
            
                    blogs.forEach((b,index)=>{
                        let myinfo=(b.content).split(' ')
                        let info=[]
                        for(let i=0 ;i<=myinfo.length;i++){
                            if(i<40){
                                info.push(myinfo[i])
                            }
                        }
                        info=info.join(' ')
                        document.getElementById('all_blogs').innerHTML+=`<div class="blog_details_dash blog_details">
                        <div class="blog_img">
                            <img src="${b.image}" alt="">
                        </div>
            
                        <div class="blog_news">
                            <div class="sub_title">
                                <p>${b.title}</p>
                            </div>
                            <div>
                                <p>
                                ${info} ...<span ><a href="single_blog.html?p_id=${b._id}" class="myorange"> Read more>></a></span>
                                </p>
                            </div>
                
                            <div class="read_more read_more_dash myflex_end myorange pt_20">
                        
                                <div class="mydelete" data-num=${b._id} onclick='deleting()'>
                                  <p>Delete</p>
                                </div>
                                
            
                                <div class="myupdate" data-num=${b._id} onclick='updating()'>
                                  <p>Update</p>
                                </div>
                            </div>
                        </div>
                    </div>`
                    
                    })  
                }
                else{
                
                document.getElementById('all_blogs').innerHTML=`
                <div class='noitem'><h1>No Blogs</h1></div>
                `
                }
        
    })
   
   
}
display_blogs()

const display_queries=()=>{
    document.getElementById('myqueries').innerHTML=''
    let queries= [];
   fetch('http://localhost:2100/myapi/query')
   .then((response)=>{
    return response.json()
   })
   .then((data)=>{
    queries=data.data
    queries.forEach((b)=>{
        document.getElementById('myqueries').innerHTML+=`
        <tr>
        <td>${b.clientname}</td>
        <td>${b.clientemail}</</td>
        <td>${b.clientmessage}</</td>
    </tr>
        `
    })
   })
      
}
   

display_queries()

// Getting post to be updated
const updating=()=>{
    const mycookie=document.cookie.split('=')[1]
   
        const update=document.getElementsByClassName('myupdate');
        const updateBtn=Array.from(update);
        updateBtn.forEach((u)=>{
            u.addEventListener('click',function(){
            
                    mypages('dashboard_update');
                    let myid=u.dataset.num
                    fetch(`http://localhost:2100/myapi/blog/${myid}`)
                    .then((response)=>{
                        return response.json()
                    })
                    .then((data)=>{
                        info=data.data
                        // console.log(info)
                        document.getElementById('post_title_upd').value=info.title;
                        document.getElementById('post_details_upd').value=info.content;
                        document.getElementById('myimg_post_upd').src=info.image;
                        localStorage.setItem('id_upd',info._id)
                       
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
                
              
            })
    })
       
  
}

// Saving the updated post
document.getElementById('save_upd').addEventListener('click',function(e){
    e.preventDefault()
    const id=localStorage.getItem('id_upd')
    localStorage.removeItem('id_upd')
    const title=document.getElementById('post_title_upd').value
    const content=document.getElementById('post_details_upd').value
    const image=document.getElementById('myimg_post_upd').src
    const data={title,content,image}
    const cookie=document.cookie.split('=')[1]
    console.log(data)
    console.log(id)
    fetch(`http://localhost:2100/myapi/blog/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'credentials':`${cookie}`
        },
        body:JSON.stringify(data)
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data)
        // mypages('all_dashboard_post')
        // display_blogs()
    })
    .catch((error)=>{
        console.log(error)
    })
    
})

// Deleting a post
const deleting=()=>{
    const deletes=document.getElementsByClassName('mydelete');
    const deleteBtn=Array.from(deletes);
    
    
    deleteBtn.forEach((d)=>{
        d.addEventListener('click',function(){
            // if(localStorage.getItem('isAdmin')==true){
                let myid=d.dataset.num       
            document.getElementById('confirmation').style.display='block'
            document.getElementById('delete_blog').addEventListener('click',function(){
             let token= document.cookie.split('=')[1]
                    console.log(myid)
                    fetch(`http://localhost:2100/myapi/blog/${myid}`,{
                        method:'DELETE',
                        headers:{
                            'Content-Type':'application/json',
                            "credentials":`${token}`
                        }
                    })
                    .then((response)=>{
                        return response.json()
                    })
                    .then((data)=>{
                        console.log(data)
                        document.getElementById('confirmation').style.display='none'
                        display_blogs()
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
    })
    document.getElementById('cancel_del').addEventListener('click',function(){
        document.getElementById('confirmation').style.display='none'
    })
            // }
            // else{
            //     alert('Not allowed')
            //     return
            // }
        })
  
})
}

const mypages=(x)=>{
    
    let clicked=document.getElementById(x)
    const all_pages=['all_dashboard_post','all_dashboard_query','dashboard_new_post','dashboard_update']
    all_pages.forEach((n)=>{
    if(clicked.id == n){
        document.getElementById(`${clicked.id}`).style.display='block'
        document.getElementById('dashboard_title_heading').innerText=`${clicked.dataset.name}`
        if(clicked.id=='all_dashboard_post'){
            location.reload()
        }
        
    }else{
        document.getElementById(`${n}`).style.display='none'
    }
    
})




}

