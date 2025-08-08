
(function(){
  // Helper: Insert at top of main content
  function insertAtTop(html){
    var main = document.querySelector('#main') || document.body;
    var div = document.createElement('div');
    div.innerHTML = html;
    main.insertBefore(div, main.firstChild);
  }

  // Styles
  var css = `
  body {font-family: Arial, sans-serif;}
  .lz-section {margin:20px auto; max-width:1200px;}
  .lz-slider {position:relative; overflow:hidden; border-radius:8px;}
  .lz-slider img {width:100%; display:none;}
  .lz-slider-dots {text-align:center; margin-top:8px;}
  .lz-slider-dots span {display:inline-block; width:10px; height:10px; background:#ccc; border-radius:50%; margin:0 4px; cursor:pointer;}
  .lz-slider-dots .active {background:#ff6a00;}
  .lz-categories {display:grid; grid-template-columns:repeat(auto-fit,minmax(100px,1fr)); gap:10px; text-align:center;}
  .lz-cat-item {background:#fff; border-radius:50%; padding:10px; border:1px solid #eee; transition:all 0.3s;}
  .lz-cat-item img {border-radius:50%; width:60px; height:60px;}
  .lz-cat-item:hover {transform:scale(1.05); border-color:#ff6a00;}
  .lz-flash-sale {background:#ff6a00; color:#fff; padding:10px; border-radius:6px; text-align:center; font-size:18px;}
  .lz-product-grid {display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:15px;}
  .lz-prod-item {background:#fff; border:1px solid #eee; border-radius:6px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.1); transition:all 0.3s;}
  .lz-prod-item:hover {transform:translateY(-4px); box-shadow:0 4px 8px rgba(0,0,0,0.15);}
  .lz-prod-item img {width:100%;}
  .lz-prod-info {padding:10px; text-align:center;}
  .lz-prod-price {color:#ff6a00; font-weight:bold;}
  .lz-discount {position:absolute; background:red; color:#fff; padding:2px 6px; top:8px; left:8px; font-size:12px; border-radius:4px;}
  .lz-coupon {background:linear-gradient(90deg,#ff6a00,#ff9500); color:#fff; padding:14px; border-radius:6px; text-align:center; font-size:20px;}
  `;
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Slider HTML
  var sliderHTML = `
  <div class="lz-section">
    <div class="lz-slider">
      <img src="https://picsum.photos/1200/400?1" style="display:block">
      <img src="https://picsum.photos/1200/400?2">
      <img src="https://picsum.photos/1200/400?3">
    </div>
    <div class="lz-slider-dots"><span class="active"></span><span></span><span></span></div>
  </div>`;

  // Categories HTML
  var catHTML = `
  <div class="lz-section">
    <div class="lz-categories">
      <div class="lz-cat-item"><img src="https://picsum.photos/80?cat1"><div>Mobiles</div></div>
      <div class="lz-cat-item"><img src="https://picsum.photos/80?cat2"><div>Fashion</div></div>
      <div class="lz-cat-item"><img src="https://picsum.photos/80?cat3"><div>Electronics</div></div>
      <div class="lz-cat-item"><img src="https://picsum.photos/80?cat4"><div>Home</div></div>
      <div class="lz-cat-item"><img src="https://picsum.photos/80?cat5"><div>Sports</div></div>
      <div class="lz-cat-item"><img src="https://picsum.photos/80?cat6"><div>Beauty</div></div>
    </div>
  </div>`;

  // Flash Sale HTML
  var flashHTML = `<div class="lz-section"><div class="lz-flash-sale">Flash Sale ends in: <span id="lz-timer"></span></div></div>`;

  // Product Grid HTML
  var prodHTML = `<div class="lz-section"><div class="lz-product-grid">`;
  for(var i=1;i<=8;i++){
    prodHTML += `
      <div class="lz-prod-item" style="position:relative">
        <span class="lz-discount">-20%</span>
        <img src="https://picsum.photos/300/300?prod${i}">
        <div class="lz-prod-info">
          Product ${i}<br>
          <span class="lz-prod-price">৳ ${(500+i*50)}</span><br>
          <button onclick="alert('Added to cart')">Add to Cart</button>
        </div>
      </div>`;
  }
  prodHTML += `</div></div>`;

  // Coupon HTML
  var couponHTML = `<div class="lz-section"><div class="lz-coupon">Use code <strong>LZFLASH10</strong> & get 10% off!</div></div>`;

  // Insert all at top
  insertAtTop(sliderHTML + catHTML + flashHTML + prodHTML + couponHTML);

  // Slider script
  (function(){
    var imgs=document.querySelectorAll('.lz-slider img'),dots=document.querySelectorAll('.lz-slider-dots span'),i=0;
    function showSlide(n){
      imgs[i].style.display='none';dots[i].classList.remove('active');
      i=n; if(i>=imgs.length) i=0; if(i<0) i=imgs.length-1;
      imgs[i].style.display='block';dots[i].classList.add('active');
    }
    setInterval(function(){showSlide(i+1);},4000);
    dots.forEach(function(dot,idx){dot.addEventListener('click',function(){showSlide(idx);});});
  })();

  // Flash sale timer
  (function(){
    var end=new Date("2025-09-01T00:00:00Z"),el=document.getElementById('lz-timer');
    function up(){
      var d=end-new Date();if(d<=0){el.textContent='Ended';return;}
      var days=Math.floor(d/86400000),h=Math.floor(d/3600000)%24,m=Math.floor(d/60000)%60,s=Math.floor(d/1000)%60;
      el.textContent=days+'d '+h+'h '+m+'m '+s+'s';
    }
    up();setInterval(up,1000);
  })();
})();
