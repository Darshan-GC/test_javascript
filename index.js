console.log("Script Loaded")
$(document).ready(function(){
    
    
  $("#burger").click(function(){
    $(".nav_items").toggleClass("nav_items-active")
    $("#burger").toggleClass("toggle")
  })

  var slideWrap = $("<div>").addClass("slider_wrap")
  var slide1 = $("<img/>",{
   src:"./image/96OnkX7.png",
   width:"100%"
    })
 var slide2 = $("<img/>").attr({
    "src":"./image/KtGxwnN.png",
    "width":"100%"
  })
 var slide3 = $("<img/>").attr({
    "src":"./image/sfjg9R8.png",
    "width":"100%"
  })
  var slide4 = $("<img/>").attr({
    "src":"./image/p0wdadG.png",
    "width":"100%"
  })
    
  $(slideWrap).append(slide1)
  $(slideWrap).append(slide2)
  $(slideWrap).append(slide3)
  $(slideWrap).append(slide4)

  $(".slider").append(slideWrap)

  $(slideWrap).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
    dots:true,
  });

  $(".slick-dots li").css({
    width:"12px",
    height:"12px",
    margin:"0 8px"
  })

  var itemLocalStorage = localStorage.getItem("Item-List") === null ? []: JSON.parse(localStorage.getItem("Item-List"));
  var cart_count = 0;
  for(var i=0;i<itemLocalStorage.length;i++)
  {
     cart_count = cart_count + itemLocalStorage[i].count
  }
   
  $("#cart_icon a i span").text(cart_count);

 

  var url;

  var clothingCardWrapper = document.getElementById("clothing_card_wrapper");
  var accessoriesCardWrapper = document.getElementById("accessories_card_wrapper");
     
  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product",function (ProductList){
    for(i=0;i<ProductList.length;i++)
    { 
      if(ProductList[i].isAccessory==false)
      {
        var Card = document.createElement("div")
        Card.id = [i+1]
        Card.className="card"
        var link = document.createElement("a")
        link.className = "link"
        link.href = "./product_details.html"
        Card.appendChild(link)
        var CardImage = document.createElement("img")                  
        CardImage.className="image"
        CardImage.src=ProductList[i].preview;
        link.appendChild(CardImage);
        var TextWrapper=document.createElement("div")
        TextWrapper.className="text_wrapper"
        var Detail= document.createElement("h2")
        Detail.className="shirt_detail"
        Detail.innerHTML= ProductList[i].name;
        TextWrapper.appendChild(Detail);
        link.appendChild(TextWrapper);
        clothingCardWrapper.appendChild(Card);
        var Brand= document.createElement("p")
        Brand.className="brand";
        Brand.innerHTML=ProductList[i].brand;
        TextWrapper.appendChild(Brand);
        var Price= document.createElement("h3")
        Price.className="price";
        Price.innerHTML="Rs "+ProductList[i].price;
        TextWrapper.appendChild(Price);
        
      } else
      { 
        var Card = document.createElement("div")
        Card.id = [i+1]
        Card.className="card"
        var link = document.createElement("a")
        link.className = "link"
        link.href = "./product_details.html"
        Card.appendChild(link)
        var CardImage = document.createElement("img")
        CardImage.className="image"
        CardImage.src=ProductList[i].preview;
        link.appendChild(CardImage);
        var TextWrapper=document.createElement("div")
        TextWrapper.className="text_wrapper"
        var Detail= document.createElement("h2")
        Detail.className="shirt_detail"
        Detail.innerHTML= ProductList[i].name;
        TextWrapper.appendChild(Detail);
        link.appendChild(TextWrapper);
        accessoriesCardWrapper.appendChild(Card);
        var Brand= document.createElement("p")
        Brand.className="brand";
        Brand.innerHTML=ProductList[i].brand;
        TextWrapper.appendChild(Brand);
        var Price= document.createElement("h3")
        Price.className="price";
        Price.innerHTML="Rs "+ProductList[i].price;
        TextWrapper.appendChild(Price);
        
        
      }
    }
     $(".card").click(function(){
       var id = (this.id) 
       console.log(id)
       url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+[id]
        sessionStorage.setItem("url",url,JSON.stringify(url))
       
      })
    
  })



 
      
  // Product Details //

  var click = sessionStorage.getItem("url")

    $.get(click,function(productData){
  var section = document.getElementById("section_details")    
   // Create Image viewer //
   var previewImage = document.createElement("div")
   var pImage = document.createElement("img")
   pImage.src = productData.preview;
   previewImage.appendChild(pImage);
   section.appendChild(previewImage); 
   pImage.className="p_Img"
   previewImage.className="preview_image";

   // Create Details //
   var detailsWrapper = document.createElement("div")
   detailsWrapper.className = "details_wrapper"
   var details = document.createElement("div");
   details.className = "details"
   detailsWrapper.appendChild(details);
   section.appendChild(detailsWrapper);
   var heading = document.createElement("h1")
   heading.innerHTML = productData.name;
   details.appendChild(heading);
   var para1 = document.createElement("p")
   para1.innerHTML = productData.brand;
   para1.className="para";
   details.appendChild(para1);
   var para2 = document.createElement("p")
   var span = document.createElement("span")
   span.innerHTML = productData.price;
   para2.innerHTML="Price: Rs "
   para2.appendChild(span);
   para2.className="para";
   details.appendChild(para2);
   var para3 = document.createElement("p")
   para3.innerHTML ="Description";
   para3.className="para";
   details.appendChild(para3);
   var para4 = document.createElement("p")
   para4.innerHTML = productData.description;
   para4.className="cloth_des";
   details.appendChild(para4);
   var para5 = document.createElement("p")
   para5.innerHTML ="Product Preview";
   para5.className="para";
   details.appendChild(para5);
   var imageWrapper = document.createElement("div");
   imageWrapper.className = "image_wrapper"
   details.appendChild(imageWrapper);

   // click border //
    $(document).on('click','.image_wrapper img',function()
   {
     $(this).addClass('active').siblings().removeClass('active')
   })

    // click view // photos render
  
  for (var i=0;i<productData.photos.length;i++)
  {
   var img = $("<img/>").attr({
     "src":productData.photos[i],
   })
   if(i==0)
   {
     $(img).addClass("active")
   }
   $(imageWrapper).append(img)

   $(img).click(function(){
     pImage.src = this.src
   })
  }

   // button //
   var btn = document.createElement("div")
   btn.className = "btn"
   detailsWrapper.appendChild(btn);
   var Button_add = document.createElement("button")
   Button_add.innerText ="Add to Cart"
   btn.appendChild(Button_add);

   // update cart count //
    var count = 0; 
  $(".btn button").click(function(){
     count+=1;
    $.get(click,function(productData){
        var itemLocalStorage = localStorage.getItem("Item-List") === null ? []: JSON.parse(localStorage.getItem("Item-List"));
         var found = 0;
        for(var i=0;i<itemLocalStorage.length;i++)
        {
          if(productData.id == itemLocalStorage[i].id)
          { 
            found = 1;
            itemLocalStorage[i].count = (parseInt(itemLocalStorage[i].count) + 1);   
          }
        }  

         if(found == 0)
         {
          itemLocalStorage.push({
            id:productData.id,
            preview:productData.preview,
            price:productData.price,
            title:productData.name,
            count:count,
            isAccessory:productData.isAccessory,
            brand:productData.brand
            })
         }
          

          localStorage.setItem("Item-List",JSON.stringify(itemLocalStorage))
         
          var cart_count = 0;
          for(var i=0;i<itemLocalStorage.length;i++)
          {
            cart_count = cart_count + itemLocalStorage[i].count
          }
   
           $("#cart_icon a i span").text(cart_count);
          
           
      }) 
    })
 })


  // Checkout page //

  var heading = $("<h1>").text("Checkout")
  $("#checkout_details").append(heading)

  
  var left_wrapper = $("<div>").addClass("left_wrapper")
  var total_Item = $("<p>").text("Total Items: ").attr("id","total_item")
  var total_Item_span = $("<span>").text(cart_count)
  var cart_item = $("<div>")
  var L_R_wrapper = $("<div>").attr("id","L-R-Wrapper")
  $(total_Item).append(total_Item_span)
  $("#checkout_details").append(total_Item)
  $("#checkout_details").append(L_R_wrapper)


  // item card //
 
  for(var i=0;i<itemLocalStorage.length;i++)
  {
    var item = $("<div>").addClass("item")
    var item_img = $("<img/>").attr({
      "src": itemLocalStorage[i].preview
    })
  
    var item_details = $("<div>").addClass("item_details")
    var item_heading = $("<h3>").text(itemLocalStorage[i].title)
    var item_count = $("<p>").text("x"+itemLocalStorage[i].count)
    var item_amount = $("<p>").text("Amount: Rs "+itemLocalStorage[i].price * itemLocalStorage[i].count)
    total = total + 
    $(item).append(item_img)
    $(item).append(item_details)
    $(item_details).append(item_heading)
    $(item_details).append(item_count)
    $(item_details).append(item_amount)
    $(left_wrapper).append(cart_item)
    $(cart_item).append(item)
    
  }
  $(L_R_wrapper).append(left_wrapper)

  // item total //
  var right_wrapper = $("<div>").addClass("right_wrapper")
  var total_amount = $("<div>").addClass("total_amount")
  var total_amount_heading = $("<h2>").text("Total Amount")
  var total_amount_number = $("<p>").text("Amount: Rs")
  var total = 0;
  for(var i=0;i<itemLocalStorage.length;i++)
  {
    total = total + itemLocalStorage[i].price * itemLocalStorage[i].count;
  }
  var total_amount_span = $("<span>").text(total).attr("id","item_total_span")
  var place_order_anchor_tag = $("<a>")
  var place_order_button = $("<button>").text("Place Order")
  $(L_R_wrapper).append(right_wrapper)
  $(right_wrapper).append(total_amount)
  $(total_amount).append(total_amount_heading)
  $(total_amount).append(total_amount_number)
  $(total_amount_number).append(total_amount_span)
  $(total_amount).append(place_order_anchor_tag)
  $(place_order_anchor_tag).append(place_order_button)

  // order confirm //

  $(".total_amount a button").click(function(e){

    var OrderItem = []
    
    for(var i=0;i<itemLocalStorage.length;i++)
    {  
      
       OrderItem.push({
       id:itemLocalStorage[i].id,
       name:itemLocalStorage[i].title,
       preview:itemLocalStorage[i].preview,
       price:itemLocalStorage[i].price,
       isAccessory:itemLocalStorage[i].isAccessory,
       brand:itemLocalStorage[i].brand,
       count:itemLocalStorage[i].count
       })

       }
      

       var dataObj = {
        amount: total,
        products: OrderItem
      }

      console.log(dataObj)
      $.post('https://5d76bf96515d1a0014085cf9.mockapi.io/order', dataObj, function() {
      
     
      localStorage.removeItem("Item-List")
      location.assign("./order_confirm.html")
      
       })    
         
  })

  // Click media query //

  var mediaQuery = window.matchMedia('(max-width: 420px)')
  if(mediaQuery.matches){

    $(document).on('click','.image_wrapper img',function()
    {
      $(window).scrollTop(20)
    })
    
  }

    
      
})

  