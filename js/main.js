const icon = document.querySelector("header #burger i");
const nav = document.querySelector("nav");
const copy = document.querySelector("#copy");
const send = document.querySelector("#send");
const link = document.querySelector("#link");
const response = document.querySelector(".response")
const err = document.querySelector("#error");
const stat = document.querySelector(".stat");



icon.addEventListener("click" , function(){
    if(icon.className === 'fas fa-bars'){
     icon.className = 'fa-solid fa-x';
     nav.style.display = 'inline-block';
    }else if (icon.className === 'fa-solid fa-x'){
     icon.className = 'fas fa-bars';
     nav.style.display = 'none';
    }
});

function xRes(text){
    err.style.display = "inline-block";
    err.textContent = text;
    link.style.border = "2px solid #F46363";
    link.placeholder = "  ";
    link.placeholder.color = "red";
}

send.addEventListener("click" , function(){
   
    if(link.value.length === 0 ){
       xRes("Please Add A Link ...");
    }
    else if(link.value.length !== 0){
       fetch(`https://api.shrtco.de/v2/shorten?url=${link.value}`)
       .then(res => res.json())
       .then(data => {         
          if(data.ok === false){
             let { error_code } = data;
             if(error_code === 2){
                xRes('Invalid URL submitted');
             }
             else if(error_code === 3){
                xRes('Rate limit reached.');
             }
             else if(error_code === 4){
                xRes('IP-Address has been blocked');
             }
             else if(error_code === 10){
                xRes('Trying to shorten a disallowed Link');
             }
          }else{
             link.value = '';
             const { original_link , short_link , code} = data.result;
             const press = document.createElement("div");
             press.classList.add("press");
             response.appendChild(press);
             const inp = document.createElement("div");
             inp.setAttribute("id","in");
             press.appendChild(inp);
             const original = document.createElement("p");
             original.setAttribute("id","in-url")
             original.textContent = original_link;
             inp.appendChild(original);
             const api = document.createElement("div");
             api.setAttribute("id","api");
             press.appendChild(api);
             const out = document.createElement("p");
             out.setAttribute("id","out-url");
             out.textContent = short_link;
             api.appendChild(out);
             const copyUrl = document.createElement('input');
             copyUrl.type = 'hidden';
             copyUrl.setAttribute('id',code);
             copyUrl.value = short_link;
             response.appendChild(copyUrl);
             const copyBtn = document.createElement("button");
             copyBtn.setAttribute("id","copy");
             copyBtn.textContent = 'Copy';
             copyBtn.addEventListener("click" , function(){
                copyBtn.textContent = "Copied";
                copyBtn.style.backgroundColor = '#3e3359';
                const linkToCopy = document.getElementById(code);
                linkToCopy.type = 'text'; 
                linkToCopy.select();
                document.execCommand("copy");
                linkToCopy.type = 'hidden';
             });
             api.appendChild(copyBtn);
          }
       })
    }
});