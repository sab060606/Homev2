const bodyTag = document.querySelector("body");
const progressTag = document.querySelector(".progress_bar");

document.addEventListener("scroll", function()
{
const pixelsScrolled = window.scrollY

const pageHeight = bodyTag.getBoundingClientRect().height;

const windowHeight = window.innerHeight;

const totalScrollableDistance = pageHeight - window.innerHeight;

const percentage = pixelsScrolled / totalScrollableDistance;


progressTag.style.height = `${percentage * 100}vh`;
// console.log(percentage)

});
window.addEventListener("mousemove", (e)=>{
  let cursor = document.getElementById("cursor");

  setTimeout(() => {
   cursor.style.top = `${e.clientY}px`;
   cursor.style.left = `${e.clientX}px`;
  }, 50);













})










const sections = document.querySelectorAll(".section");
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
  

  function WordShuffler(holder,opt){
    var that = this;
    var time = 0;
    this.now;
    this.then = Date.now();
    
    this.delta;
    this.currentTimeOffset = 0;
    
    this.word = null;
    this.currentWord = null;
    this.currentCharacter = 0;
    this.currentWordLength = 0;
  
  
    var options = {
      fps : 20,
      timeOffset : 5,
      textColor : '#000',
      fontSize : "50px",
      useCanvas : false,
      mixCapital : false,
      mixSpecialCharacters : false,
      needUpdate : true,
      colors : [
        '#0039FF'
      ]
    }
  
    if(typeof opt != "undefined"){
      for(key in opt){
        options[key] = opt[key];
      }
    }
  
  
    
    this.needUpdate = true;
    this.fps = options.fps;
    this.interval = 1000/this.fps;
    this.timeOffset = options.timeOffset;
    this.textColor = options.textColor;
    this.fontSize = options.fontSize;
    this.mixCapital = options.mixCapital;
    this.mixSpecialCharacters = options.mixSpecialCharacters;
    this.colors = options.colors;
  
     this.useCanvas = options.useCanvas;
    
    this.chars = [
      '9','5','6','1',
      '2','N','4','4',
      '0','6','6','9',
      '1','3','9','8',
      '8','9','N','4',
      '5','5','7','7',
      '1','E','4','3',
      '6','7','0','8',
      'N','7','0','2',
      '8','4','8','4',
      '4','W'

    ];
    this.specialCharacters = [
      '.','°',',','.'
    ]
  
    if(this.mixSpecialCharacters){
      this.chars = this.chars.concat(this.specialCharacters);
    }
  
    this.getRandomColor = function () {
      var randNum = Math.floor( Math.random() * this.colors.length );
      return this.colors[randNum];
    }
  
    //if Canvas
   
    this.position = {
      x : 0,
      y : 50
    }
  
    //if DOM
    if(typeof holder != "undefined"){
      this.holder = holder;
    }
  
    if(!this.useCanvas && typeof this.holder == "undefined"){
      console.warn('Holder must be defined in DOM Mode. Use Canvas or define Holder');
    }
  
  
    this.getRandCharacter = function(characterToReplace){    
      if(characterToReplace == " "){
        return ' ';
      }
      var randNum = Math.floor(Math.random() * this.chars.length);
      var lowChoice =  -.5 + Math.random();
      var picketCharacter = this.chars[randNum];
      var choosen = picketCharacter.toLowerCase();
      if(this.mixCapital){
        choosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
      }
      return choosen;
      
    }
  
    this.writeWord = function(word){
      this.word = word;
      this.currentWord = word.split('');
      this.currentWordLength = this.currentWord.length;
  
    }
  
    this.generateSingleCharacter = function (color,character) {
      var span = document.createElement('span');
      span.style.color = color;
      span.innerHTML = character;
      return span;
    }
  
    this.updateCharacter = function (time) {
      
        this.now = Date.now();
        this.delta = this.now - this.then;
  
         
  
        if (this.delta > this.interval) {
          this.currentTimeOffset++;
        
          var word = [];
  
          if(this.currentTimeOffset === this.timeOffset && this.currentCharacter !== this.currentWordLength){
            this.currentCharacter++;
            this.currentTimeOffset = 0;
          }
          for(var k=0;k<this.currentCharacter;k++){
            word.push(this.currentWord[k]);
          }
  
          for(var i=0;i<this.currentWordLength - this.currentCharacter;i++){
            word.push(this.getRandCharacter(this.currentWord[this.currentCharacter+i]));
          }
  
  
          if(that.useCanvas){
            c.clearRect(0,0,stage.x * stage.dpr , stage.y * stage.dpr);
            c.font = that.fontSize + " sans-serif";
            var spacing = 0;
            word.forEach(function (w,index) {
              if(index > that.currentCharacter){
                c.fillStyle = that.getRandomColor();
              }else{
                c.fillStyle = that.textColor;
              }
              c.fillText(w, that.position.x + spacing, that.position.y);
              spacing += c.measureText(w).width;
            });
          }else{
  
            if(that.currentCharacter === that.currentWordLength){
              that.needUpdate = false;
            }
            this.holder.innerHTML = '';
            word.forEach(function (w,index) {
              var color = null
              if(index > that.currentCharacter){
                color = that.getRandomColor();
              }else{
                color = that.textColor;
              }
              that.holder.appendChild(that.generateSingleCharacter(color, w));
            }); 
          }
          this.then = this.now - (this.delta % this.interval);
        }
    }
  
    this.restart = function () {
      this.currentCharacter = 0;
      this.needUpdate = true;
    }
  
    function update(time) {
      time++;
      if(that.needUpdate){
        that.updateCharacter(time);
      }
      requestAnimationFrame(update);
    }
  
    this.writeWord(this.holder.innerHTML);
  
  
    console.log(this.currentWord);
    update(time);
  }
  
  
  
  
  var headline = document.getElementById('headline');
  var text = document.getElementById('text');
  var shuffler = document.getElementById('shuffler');
  
  var headText = new WordShuffler(headline,{
    textColor : '#0039FF',
    timeOffset : 18,
    mixCapital : true,
    mixSpecialCharacters : true
  });
  
  var pText = new WordShuffler(text,{
    textColor : '#0039FF',
    timeOffset : 2
  });
  
  var buttonText = new WordShuffler(shuffler,{
    textColor : 'tomato',
    timeOffset : 10
  });
  
  
  
    shuffler.addEventListener('click',function () {
      headText.restart();
      pText.restart();
      buttonText.restart();
    });

    

    