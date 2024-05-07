const imageList = document.querySelector(".image-list");
const slideButtons = document.querySelectorAll(".slide-wrapper button");
const scrollContainer = document.querySelector(".scroll-container");
const scrollThumb = scrollContainer.querySelector(".scroll-thumb");

const loadFunction = () =>{

    slideButtons.forEach(button =>{
        button.addEventListener("click" ,() =>{
        const direction = button.id === "left"? -1:1;
        const scrollAmount = imageList.clientWidth*direction;
        imageList.scrollBy({
            left:scrollAmount,behavior:"smooth"
        })
        })
    })
}
const buttonHandlers = () =>{
    const maxScrolWidth = imageList.scrollWidth - imageList.clientWidth;

    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrolWidth ? "none" : "block";
}

scrollThumb.addEventListener("mousedown" , (e) =>{
      const startX = e.clientX;
      const thumbPosition = scrollThumb.offsetLeft;
     

      const moveFunction = (e) =>{
        const maxScrolWidth = imageList.scrollWidth - imageList.clientWidth;

        const deltaX = e.clientX - startX;
        const newThumb = thumbPosition + deltaX;
        const maxThumbPosition = scrollContainer.getBoundingClientRect().width - scrollThumb.offsetWidth;
        const boundPosition = Math.max(0,Math.min(maxThumbPosition,newThumb));
        const imgPosition = (boundPosition / maxThumbPosition) * maxScrolWidth;
        scrollThumb.style.left = `${boundPosition}px`;
        imageList.scrollLeft = imgPosition;
      }
      const moveupFunction = () =>{
        document.removeEventListener("mousemove" , moveFunction);
        document.removeEventListener("mouseup" , moveupFunction);
      }

      document.addEventListener("mousemove" , moveFunction);
      document.addEventListener("mouseup" , moveupFunction);
})
const updateScroll = () => {
    const maxScrolWidth = imageList.scrollWidth - imageList.clientWidth;

    const scrollPosition = imageList.scrollLeft;

    const scrollThumbPosition = (scrollPosition / maxScrolWidth) * (scrollContainer.clientWidth - scrollThumb.offsetWidth);
    
    scrollThumb.style.left = `${scrollThumbPosition}px`;

}

imageList.addEventListener("scroll" , () => {
    buttonHandlers();
    updateScroll();
})


window.addEventListener("load", loadFunction);