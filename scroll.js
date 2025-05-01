const bodyTag = document.querySelector("body");
const sections = document.querySelectorAll(".section_2");
// pixels scrolled
document.addEventListener("scroll", function()
{
const pixelsScrolled = window.scrollY;

console.log(pixelsScrolled)
pixelsTag.innerHTML = Math.floor(pixelsScrolled)
})
document.addEventListener("scroll", function () {
    const topViewport = window.scrollY;
    const midViewport = topViewport + window.innerHeight / 2;
  
    sections.forEach((section) => {
      const topSection = section.offsetTop;
      const midSection = topSection + section.offsetHeight / 2;
  
      const distanceToSection = midViewport - midSection;
  
      const parallaxTags = section.querySelectorAll(`[data-parallax]`);
  
      // loop over each parallaxed tag
      parallaxTags.forEach((tag) => {
        const speed = parseFloat(tag.getAttribute("data-parallax"));
        tag.style.transform = `translate(0, ${distanceToSection * speed}px)`;
      });
    });
  });

  window.addEventListener("mousemove", (e)=>{
    let cursor = document.getElementById("cursor");
 
    setTimeout(() => {
     cursor.style.top = `${e.clientY}px`;
     cursor.style.left = `${e.clientX}px`;
    }, 50);
 
 
 
 
 
 
 
 
 
 
 
 
 
 })