let saturate=document.getElementById("saturate");
let contrast=document.getElementById("contrast");
let brightness=document.getElementById("brightness");
let sepia=document.getElementById("sepia");
let grayscale=document.getElementById("grayscale");
let blur=document.getElementById("blur");
let hueRotate=document.getElementById("hue-rotate");

let upLoad=document.getElementById("upload");
let download=document.getElementById("download");
let img=document.getElementById("img");

let reset=document.querySelector('span');
let imgBox=document.querySelector('.img-box');

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");// هادي بتاخد اسم الصورة يلي بدك ترسمها كانفس

// the call the function with the upload the img
function resetValue(){
    img.style.filter='none';
    saturate.value="100";
    contrast.value="100";
    brightness.value="100";
    sepia.value="0";
    grayscale.value="0";
    blur.value="0";
    hueRotate.value ="0";
}

window.onload = function(){
    download.style.display ='none';
    reset.style.display ='none';
    imgBox.style.display ='none';
    
}
//onchange >> حطيناها بدل ان لود عشان ممكن المتستخدم ما يحمل اشي ويصير عندي مشكله دائما مع الملفات استخدم التشينج
upLoad.onchange=function(){
    resetValue();
    download.style.display='block';
    reset.style.display='block';
    imgBox.style.display='block';
    let file=new FileReader();
    file.readAsDataURL(upLoad.files[0]);// هادا بياخد الصورة الامتداد تبهعا وبحطو في اريه فاحنا احنا علمنا يلي بحمل الصورة نحطها في الاريه
    file.onload=function(){
        img.src = file.result;  // هادي مهمه عشان اول حاجه يتحمل الملف بعدين تحط الامتداد في)(src)
    }
    img.onload= function(){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display='none'
    }
    
}
// هان بصير في مشكله انو لو بدي اعمل على قلتر ورحت على فلتر تاني بروح كل الشل يلي اشتغلتو على الفلتر
// saturate.addEventListener("input",function(){
//     img.style.filter=`saturate(${saturate.value}%)`;
// })

let filters=document.querySelectorAll("ul li input");
filters.forEach( filter=>{
    filter.addEventListener("input",function(){
        //img to canvas (ctx)
        ctx.filter=`
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value}%)
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    })
})

download.onclick=function(){
    download.href = canvas.toDataURL();
}