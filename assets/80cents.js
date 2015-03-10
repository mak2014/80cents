/**
 * 80cents - 80cents is everything you need to sell anywhere (with your own io.js or nodejs servers) — Edit
 * @version v0.3.10
 * @link    http://zetapath.com
 * @author   ()
 * @license 
 */
(function(){"use strict";var bind=function(fn,me){return function(){return fn.apply(me,arguments)}},extend=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child},hasProp={}.hasOwnProperty,indexOf=[].indexOf||function(item){for(var i=0,l=this.length;l>i;i++)if(i in this&&this[i]===item)return i;return-1};__["const"]={},Atoms.$(function(){var ref;return __.page=Atoms.$("body").attr("data-page"),__.session||(new Atoms.Organism.Session,Atoms.$("[data-action=session]").on("click",function(){return __.Dialog.Session.login()})),__.el={document:$(document),header:$("header"),slideshow:$("article.slideshow")},("collection"===(ref=__.page)||"page"===ref)&&Atoms.$("header a[href='"+window.location.pathname+"']").addClass("active"),Atoms.$(document).on("scroll",function(){var percent;return percent=100*__.el.document.scrollTop()/__.el.slideshow.height(),percent>25?(__.el.header.addClass("scroll"),__.el.slideshow.addClass("scroll")):(__.el.header.removeClass("scroll"),__.el.slideshow.removeClass("scroll"))})}),window.__=window.__||{},__.proxy=function(type,method,parameters,background){var content_type,promise,token;return null==parameters&&(parameters={}),null==background&&(background=!1),promise=new Hope.Promise,background||__.Dialog.Loading.show(),("POST"===type||"PUT"===type)&&(parameters=JSON.stringify(parameters),content_type="application/json"),token="undefined"!=typeof session&&null!==session?session.token:null,$.ajax({url:__.host+"api/"+method,type:type,data:parameters,dataType:"json",contentType:content_type,success:function(xhr){return background||__.Dialog.Loading.hide(),promise.done(null,xhr)},error:function(){return function(xhr){var error;return background||__.Dialog.Loading.hide(),error={code:xhr.status,message:xhr.responseJSON.message},promise.done(error,null)}}(this)}),promise},__["const"]={ORDER:{STATE:{SHOPPING:0,PURCHASED:1,PROCESSED:2,SENT:3,FINISHED:4}}},Atoms.$(function(){return"checkout"===__.page?new Atoms.Organism.Checkout({container:"article#checkout"}):void 0}),Atoms.$(function(){var dialog;return"login"!==__.page||__.session?void 0:(dialog=new Atoms.Organism.Session,dialog.login())}),Atoms.$(function(){return"order"===__.page?Atoms.$("[data-action=delete]").on("click",function(event){var parameters;return parameters={id:Atoms.$(event.target).parents("[data-line]").attr("data-line"),order:__.order},__.proxy("DELETE","order/line",parameters).then(function(){return window.location.reload()})}):void 0}),Atoms.$(function(){var el;return"product"===__.page?(el={quantity:Atoms.$("input[name=quantity]"),color:Atoms.$("select[name=color]"),name:Atoms.$("select[name=name]")},Atoms.$("article button[data-action]").on("click",function(event){var method,parameters,quantity,ref,ref1;return event.preventDefault(),method=$(event.target).attr("data-action"),quantity=parseInt(el.quantity.val()),"add"===method?__.session?(parameters={product:__.product,quantity:el.quantity.val(),color:null!=(ref=el.color)?ref.val():void 0,size:null!=(ref1=el.name)?ref1.val():void 0},__.proxy("POST","order/line",parameters).then(function(error,order){var cart;return error?__.Dialog.Success.show("cross","Something was wrong"):(__.Dialog.Success.show("checkmark","Product Added"),cart=Atoms.$("header [data-shopio='cart']"),cart.children("strong").html(order.amount),cart.children("small").html(order.lines.length))})):__.Dialog.Session.login():"minus"===method&&quantity>1?el.quantity.val(quantity-1):"plus"===method&&100>quantity?el.quantity.val(quantity+1):void 0}),$(".fancybox").fancybox({padding:0,beforeShow:function(){return $.fancybox.wrap.bind("contextmenu",function(){return!1})},openEffect:"elastic",closeEffect:"elastic",helpers:{overlay:{css:{background:'rgba(0,0,0,0.75) url("/img/overlay.png") repeat 0 0'}}}})):void 0}),Atoms.Organism.Checkout=function(superClass){function Checkout(){this.onAddressChange=bind(this.onAddressChange,this),Checkout.__super__.constructor.apply(this,arguments),__.proxy("GET","order",{id:__.order}).then(function(_this){return function(error,order1){var data,key;return _this.order=order1,error&&(window.location="/"),_this.billing.address.value(_this.order.billing||{}),_this.shipping.address.value(_this.order.shipping||{}),_this.purchase.payment.refresh({options:function(){var ref,results;ref=this.order.settings.payments,results=[];for(key in ref)data=ref[key],results.push({label:key,value:data.type});return results}.call(_this),disabled:_this.order.state!==__["const"].ORDER.STATE.SHOPPING}),_this.purchase.payment.value(_this.order.payment_type),_this.purchase.comment.value(_this.order.comment),_this.__validPurchase(),null!=_this.order.settings.payments.stripe?(_this.stripe=StripeCheckout.configure({key:_this.order.settings.payments.stripe.publishable_key,image:"/img/stripe.png",token:function(token){var parameters;return parameters={id:_this.order.id,token:token.id,type:1},__.proxy("PUT","order/checkout",parameters).then(function(error){return error?__.Dialog.Success.show("cross","Something was wrong"):(__.Dialog.Success.show("checkmark","Order accepted"),setTimeout(function(){return function(){return window.location="/profile"}}(this),3e3))})}}),window.addEventListener("popstate",function(){return _this.stripe.close()})):void 0}}(this))}return extend(Checkout,superClass),Checkout["default"]={style:"active container",children:[{"Molecule.Div":{id:"billing",style:"box",data:{column:"4"},children:[{"Atom.Heading":{value:"Billing Details",size:"h5"}},{"Molecule.Address":{id:"address",title:"Contact",required:!0}}]}},{"Molecule.Div":{id:"shipping",style:"box",data:{column:"4"},children:[{"Atom.Heading":{value:"Ship to a different address?",style:"inline",size:"h5"}},{"Atom.Input":{id:"different",type:"checkbox",events:["change"],callbacks:["onShippingAddress"]}},{"Molecule.Address":{id:"address",title:"Contact",required:!0,disabled:!0}}]}},{"Molecule.Div":{id:"purchase",style:"box",data:{column:"4"},children:[{"Atom.Heading":{value:"Payment Method",size:"h5"}},{"Atom.Select":{id:"payment",name:"payment_type"}},{"Atom.Heading":{value:"Comment",size:"h5"}},{"Atom.Textarea":{id:"comment",placeholder:"Write here your observations for your order..."}},{"Atom.Heading":{value:"Review your order",size:"h5"}},{"Atom.Button":{id:"submit",style:"primary big anchor",text:"Place order",disabled:!0,callbacks:["onPurchase"]}}]}}]},Checkout.prototype.onAddressChange=function(){var valid;return valid=!0,this.shipping.different.value()||this.shipping.address.value(this.billing.address.value().address),this.__validPurchase()},Checkout.prototype.onShippingAddress=function(event,atom){var child,i,len,ref,results;for(ref=this.shipping.address.children,results=[],i=0,len=ref.length;len>i;i++)child=ref[i],"Input"===child.constructor.name&&results.push(child.el.attr("disabled",!atom.value()));return results},Checkout.prototype.onPayment=function(event,atom){return console.log("onPayment",event,atom)},Checkout.prototype.onPurchase=function(){var parameters;return parameters={id:__.order,billing:this.billing.address.value().address,shipping:this.shipping.address.value().address,payment_type:this.purchase.payment.value(),comment:this.purchase.comment.value()},__.proxy("PUT","order",parameters).then(function(_this){return function(){return _this.stripe.open({name:_this.order.settings.name,description:_this.order.lines.length+" products ($"+_this.order.amount+")",amount:_this.order.amount.toString().replace(".",""),email:__.session.mail})}}(this))},Checkout.prototype.__validPurchase=function(){var context,i,key,len,ref,ref1,valid,value;for(valid=!0,ref=["billing","shipping"],i=0,len=ref.length;len>i;i++)if(context=ref[i],valid===!0){ref1=this[context].address.value().address;for(key in ref1)if(value=ref1[key],""===value){valid=!1;break}}return this.purchase.submit.refresh({disabled:!valid}),valid},Checkout}(Atoms.Organism.Section),Atoms.Organism.Success=function(superClass){function Success(){return Success.__super__.constructor.apply(this,arguments)}return extend(Success,superClass),Success["default"]={style:"align center",children:[{"Organism.Section":{id:"section",children:[{"Atom.Icon":{id:"icon",icon:"cart"},"Atom.Text":{id:"text",value:"Product added"}}]}}]},Success.prototype.show=function(icon,text){return null==icon&&(icon="cart"),null==text&&(text=""),this.section.icon.refresh({icon:icon}),this.section.text.refresh({value:text}),setTimeout(function(_this){return function(){return _this.hide()}}(this),2e3),Success.__super__.show.apply(this,arguments)},Success}(Atoms.Organism.Dialog),new Atoms.Organism.Success,Atoms.Molecule.Address=function(superClass){function Address(attributes){var child,i,len,ref,value;if(attributes.required||attributes.disabled)for(attributes.events=["change"],attributes.callbacks=["onAddressChange"],ref=this.constructor["default"].children,value=i=0,len=ref.length;len>i;value=++i)child=ref[value],child["Atom.Input"]&&(child["Atom.Input"].events=["keyup"],attributes.disabled&&(child["Atom.Input"].disabled=attributes.disabled));Address.__super__.constructor.call(this,attributes),this.children[0].el.html(""+this.attributes.title)}return extend(Address,superClass),Address["extends"]=!0,Address["default"]={children:[{"Atom.Label":{value:"Contact"}},{"Atom.Input":{name:"contact"}},{"Atom.Label":{value:"Street"}},{"Atom.Input":{name:"address"}},{"Atom.Label":{style:"half",value:"City"}},{"Atom.Label":{style:"half",value:"Postal / ZIP Code"}},{"Atom.Input":{style:"half",name:"city"}},{"Atom.Input":{style:"half",name:"zip_code"}},{"Atom.Label":{style:"half",value:"Country"}},{"Atom.Label":{style:"half",value:"Phone"}},{"Atom.Input":{style:"half",name:"country"}},{"Atom.Input":{style:"half",name:"tel"}}]},Address.prototype.value=function(values){var result;return values=Address.__super__.value.call(this,values),result={},result[this.attributes.id]=values,result},Address}(Atoms.Molecule.Form),Atoms.Organism.Session=function(superClass){function Session(){return Session.__super__.constructor.apply(this,arguments)}return extend(Session,superClass),Session.url="/assets/core/scaffold/common/organism/dialog.session.json",Session.prototype.render=function(){return Session.__super__.render.apply(this,arguments),this.admin_mode="/admin"===Atoms.Url.path()},Session.prototype.login=function(){var active,disable;return this._context(active="login",disable="signup"),this.show()},Session.prototype.signup=function(){var active,disable;return this._context(active="signup",disable="login"),this.show()},Session.prototype.onFormChange=function(event,form){var key,ref,required,valid,value;this.section.error.el.hide(),required=["mail","password"],valid=!0,ref=form.value();for(key in ref)value=ref[key],indexOf.call(required,key)>=0&&""===value&&(valid=!1);return this._footerActive(valid)},Session.prototype.onSubmit=function(event,button){var api;return this._disableForm(),api=button.attributes.api,__.proxy("POST",api,this.section.form.value()).then(function(_this){return function(error,response){return _this._enableForm(),null!=(null!=response?response.id:void 0)?_this.admin_mode?window.location="/admin/dashboard":window.location.reload():_this.section.error.el.html(error.message).show()}}(this))},Session.prototype.onContext=function(event,atom){return this[atom.attributes.context]()},Session.prototype.onClose=function(){return this.hide(),!1},Session.prototype._context=function(active,disable){return this.section.form.clean(),this.section.error.el.hide(),this.el.find("."+disable+"-context").hide(),this.el.find("."+active+"-context").show(),this._footerActive(!1),this.footer.navigation.submit.refresh({api:active,text:active}),setTimeout(function(_this){return function(){return _this.section.form.el.children().first().focus()}}(this),350)},Session.prototype._disableForm=function(){return this.section.form.el.children().attr("disabled",!0)},Session.prototype._enableForm=function(){return this.section.form.el.children().removeAttr("disabled").removeClass("loading")},Session.prototype._footerActive=function(value){return value?(this.footer.el.removeClass("disabled"),this.footer.navigation.el.children().removeAttr("disabled")):(this.footer.el.addClass("disabled"),this.footer.navigation.el.children().attr("disabled",!0))},Session}(Atoms.Organism.Dialog)}).call(this);