"use strict";(self.webpackChunkchocolatestore=self.webpackChunkchocolatestore||[]).push([[494],{6933:(n,e,t)=>{t.d(e,{r:()=>c});var r=t(4942),i=t(885),A=t(7294),a=t(4494),o=t(5557),s=t(3379),l=t.n(s),m=t(2009);l()(m.Z,{insert:"head",singleton:!1}),m.Z.locals;var d=t(5893);function p(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function u(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?p(Object(t),!0).forEach((function(e){(0,r.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function c(n){var e=n.fields,t=n.onSubmit,s=(0,a.v9)(o.LA),l=A.useState({statusCode:"",message:"",error:""}),m=(0,i.Z)(l,2),p=m[0],c=m[1],h=A.useState({}),E=(0,i.Z)(h,2),g=E[0],C=E[1];function x(n){var e=n.target,t=e.name,i=e.value;C(u(u({},g),{},(0,r.Z)({},t,i))),p.message.length>0&&0===i.length&&c({statusCode:"",message:"",error:""})}return(0,d.jsxs)("form",{className:"profile-form",onSubmit:t,children:[(0,d.jsx)("h1",{id:"profile-form__headlabel",children:e.labels.head}),(0,d.jsx)("label",{children:e.labels.labelx}),(0,d.jsx)("input",{type:e.inputs.inputx.type,name:e.inputs.inputx.name,id:e.inputs.inputx.id,placeholder:e.inputs.inputx.placeholder,minLength:e.inputs.inputx.minLength,maxLength:e.inputs.inputx.maxLength,disabled:e.inputs.inputx.disabled,pattern:e.inputs.inputx.pattern,title:e.inputs.inputx.title,required:e.inputs.inputx.required,onChange:x}),(0,d.jsx)("label",{children:e.labels.labely}),(0,d.jsx)("input",{type:e.inputs.inputy.type,name:e.inputs.inputy.name,id:e.inputs.inputy.id,placeholder:e.inputs.inputy.placeholder,disabled:e.inputs.inputy.disabled,pattern:e.inputs.inputy.pattern,minLength:e.inputs.inputy.minLength,maxLength:e.inputs.inputy.maxLength,title:e.inputs.inputy.title,required:e.inputs.inputy.required,onChange:x}),(0,d.jsx)(f,{message:s?s.message:""}),(0,d.jsx)("button",{type:"submit",disabled:!1,children:e.labels.submit})]})}function f(n){var e=n.message;return(0,d.jsx)("p",{id:"form-warning",children:e})}},4306:(n,e,t)=>{function r(n){var e=Array.from(n).filter((function(n){return"INPUT"===n.nodeName||"SELECT"===n.nodeName&&!1===n.multiple||"TEXTAREA"===n.nodeName})).map((function(n){return[n.name,"file"===n.type?n.files[0].name:n.value]}));return Object.fromEntries(e)}function i(n){return Array.from(n.selectedOptions).map((function(n){return{id:n.value,cname:n.text}}))}function A(n){return Array.from(n.selectedOptions).map((function(n){return{id:n.value}}))}t.d(e,{Ms:()=>r,qu:()=>i,DS:()=>A})},9781:(n,e,t)=>{t.d(e,{r:()=>l}),t(7294);var r=t(3379),i=t.n(r),A=t(3672);i()(A.Z,{insert:"head",singleton:!1}),A.Z.locals;var a=t(3727),o=t(5977),s=t(5893);function l(n){var e=n.img,t=n.children,r=(0,o.$B)().url;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"auth-overlay",children:[(0,s.jsx)("img",{src:e}),t]}),"/login"===r?(0,s.jsx)(a.rU,{to:"/register",className:"register-link",children:"Don't have an account yet? Click here to register"}):null]})}},494:(n,e,t)=>{t.r(e),t.d(e,{default:()=>f}),t(7294);var r=t(3379),i=t.n(r),A=t(4442);i()(A.Z,{insert:"head",singleton:!1}),A.Z.locals;var a=t(4494),o=t(3701),s=t(5977),l=t(2878),m=t(9781),d=t(6933),p=t(4306),u=t(5557),c=t(5893);const f=function(){var n=(0,a.v9)(u.LA),e=(0,s.k6)().push,t=(0,a.I0)();return(0,c.jsx)("div",{className:"register",children:(0,c.jsx)(m.r,{img:l,children:(0,c.jsx)(d.r,{onSubmit:function(r){r.preventDefault();var i=(0,p.Ms)(r.currentTarget.elements);t((0,o.bj)(i)),null==n&&setTimeout((function(){return e("login")}),500)},fields:{inputs:{inputx:{type:"email",name:"email",pattern:new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).toString().slice(1,-1),required:!0,title:"Provide an email address",minLength:3,maxLength:256,id:"email",placeholder:"Email"},inputy:{type:"password",name:"password",id:"password",placeholder:"Password",pattern:new RegExp(/(?=.*[A-Za-z])[A-Za-z\d!]{6,}/).toString().slice(1,-1),required:!0,title:"Provide a password with at least 6 characters",minLength:6,maxLength:128}},labels:{head:"Register",submit:"Register",labelx:"Email",labely:"Password"}}})})})}},2009:(n,e,t)=>{t.d(e,{Z:()=>o});var r=t(4015),i=t.n(r),A=t(3645),a=t.n(A)()(i());a.push([n.id,".profile-form {\n  font-family: 'Montserrat';\n  position: relative;\n  padding: 2.5rem;\n  background-color: #232946;\n}\n\n.profile-form h1 {\n  color: #f5f5f5;\n  font-size: 2.4rem;\n  z-index: 9;\n  margin-bottom: 1rem;\n}\n\n.profile-form label {\n  line-height: 1;\n  display: block;\n  color: #f5f5f5;\n  font-size: 1rem;\n  font-weight: 300;\n  margin: 0.5rem 0rem 0.5rem 0rem;\n}\n\n.profile-form input {\n  font-family: 'Montserrat', sans-serif;\n  width: 100%;\n  font-size: 1rem;\n  padding: .8rem;\n  margin-bottom: 1rem;\n  border-radius: 4px;\n  border: none;\n  outline: 0;\n}\n\n.profile-form button[type=submit] {\n  width: 100%;\n  font-family: 'Roboto', sans-serif;\n  font-size: 1em;\n  background: #f5f5f5;\n  color: #131313;\n  outline: 0;\n  border: 0;\n  border: none;\n  margin-top: 1em;\n  padding: 15px;\n  letter-spacing: 1px;\n  cursor: pointer;\n  transition: all .5s;\n}\n\n.profile-form button[type=submit]:hover {\n  background: #dbdbdb;\n}\n\n.profile-form .warning-text {\n  display: none;\n  font-size: 1rem;\n  color: #ff8906;\n  margin: 1px 0px 10px 0px;\n}\n\n@media (max-width: 620px) {\n  .profile-form {\n    height: inherit;\n    width: 100%;\n  }\n}\n","",{version:3,sources:["webpack://./src/features/forms/profile-form/profile-form.css"],names:[],mappings:"AAAA;EACE,yBAAyB;EACzB,kBAAkB;EAClB,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,iBAAiB;EACjB,UAAU;EACV,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,cAAc;EACd,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,+BAA+B;AACjC;;AAEA;EACE,qCAAqC;EACrC,WAAW;EACX,eAAe;EACf,cAAc;EACd,mBAAmB;EACnB,kBAAkB;EAClB,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,iCAAiC;EACjC,cAAc;EACd,mBAAmB;EACnB,cAAc;EACd,UAAU;EACV,SAAS;EACT,YAAY;EACZ,eAAe;EACf,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,cAAc;EACd,wBAAwB;AAC1B;;AAEA;EACE;IACE,eAAe;IACf,WAAW;EACb;AACF",sourcesContent:[".profile-form {\n  font-family: 'Montserrat';\n  position: relative;\n  padding: 2.5rem;\n  background-color: #232946;\n}\n\n.profile-form h1 {\n  color: #f5f5f5;\n  font-size: 2.4rem;\n  z-index: 9;\n  margin-bottom: 1rem;\n}\n\n.profile-form label {\n  line-height: 1;\n  display: block;\n  color: #f5f5f5;\n  font-size: 1rem;\n  font-weight: 300;\n  margin: 0.5rem 0rem 0.5rem 0rem;\n}\n\n.profile-form input {\n  font-family: 'Montserrat', sans-serif;\n  width: 100%;\n  font-size: 1rem;\n  padding: .8rem;\n  margin-bottom: 1rem;\n  border-radius: 4px;\n  border: none;\n  outline: 0;\n}\n\n.profile-form button[type=submit] {\n  width: 100%;\n  font-family: 'Roboto', sans-serif;\n  font-size: 1em;\n  background: #f5f5f5;\n  color: #131313;\n  outline: 0;\n  border: 0;\n  border: none;\n  margin-top: 1em;\n  padding: 15px;\n  letter-spacing: 1px;\n  cursor: pointer;\n  transition: all .5s;\n}\n\n.profile-form button[type=submit]:hover {\n  background: #dbdbdb;\n}\n\n.profile-form .warning-text {\n  display: none;\n  font-size: 1rem;\n  color: #ff8906;\n  margin: 1px 0px 10px 0px;\n}\n\n@media (max-width: 620px) {\n  .profile-form {\n    height: inherit;\n    width: 100%;\n  }\n}\n"],sourceRoot:""}]);const o=a},3672:(n,e,t)=>{t.d(e,{Z:()=>o});var r=t(4015),i=t.n(r),A=t(3645),a=t.n(A)()(i());a.push([n.id,".auth-overlay {\n  position: relative;\n  display: flex;\n  width: 60%;\n}\n\n.auth-overlay img {\n  position: relative;\n  object-fit: cover;\n  width: 60%;\n  height: 75vh;\n}\n\n.auth-overlay form {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background: #55423d;\n  flex-grow: 1;\n  min-width: 320px;\n}\n\n@media (max-width: 1400px) {\n  .auth-overlay .register-link {\n    right: 45%;\n  }\n}\n\n@media (max-width: 1220px) {\n  .auth-overlay .register-link {\n    right: 47%;\n    font-size: .9rem;\n  }\n}\n\n@media (max-width: 1150px) {\n  .auth-overlay .register-link {\n    right: 50%;\n    font-size: .8rem;\n  }\n}\n\n@media (max-width: 1100px) {\n  .auth-overlay {\n    width: 70%;\n  }\n}\n\n@media (max-width: 940px) {\n  .auth-overlay {\n    width: 80%;\n  }\n}\n\n@media (max-width: 840px) {\n  .auth-overlay {\n    width: 90%;\n  }\n}\n\n@media (max-width: 720px) {\n  .auth-overlay {\n    width: 95%;\n  }\n}\n\n@media (max-width: 680px) {\n  .auth-overlay .register-link {\n    text-align: center;\n    right: 52%;\n    font-size: 1.2rem;\n  }\n}\n","",{version:3,sources:["webpack://./src/features/user/auth-overlay/auth-overlay.css"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,aAAa;EACb,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,UAAU;EACV,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;IACV,gBAAgB;EAClB;AACF;;AAEA;EACE;IACE,UAAU;IACV,gBAAgB;EAClB;AACF;;AAEA;EACE;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,kBAAkB;IAClB,UAAU;IACV,iBAAiB;EACnB;AACF",sourcesContent:[".auth-overlay {\n  position: relative;\n  display: flex;\n  width: 60%;\n}\n\n.auth-overlay img {\n  position: relative;\n  object-fit: cover;\n  width: 60%;\n  height: 75vh;\n}\n\n.auth-overlay form {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background: #55423d;\n  flex-grow: 1;\n  min-width: 320px;\n}\n\n@media (max-width: 1400px) {\n  .auth-overlay .register-link {\n    right: 45%;\n  }\n}\n\n@media (max-width: 1220px) {\n  .auth-overlay .register-link {\n    right: 47%;\n    font-size: .9rem;\n  }\n}\n\n@media (max-width: 1150px) {\n  .auth-overlay .register-link {\n    right: 50%;\n    font-size: .8rem;\n  }\n}\n\n@media (max-width: 1100px) {\n  .auth-overlay {\n    width: 70%;\n  }\n}\n\n@media (max-width: 940px) {\n  .auth-overlay {\n    width: 80%;\n  }\n}\n\n@media (max-width: 840px) {\n  .auth-overlay {\n    width: 90%;\n  }\n}\n\n@media (max-width: 720px) {\n  .auth-overlay {\n    width: 95%;\n  }\n}\n\n@media (max-width: 680px) {\n  .auth-overlay .register-link {\n    text-align: center;\n    right: 52%;\n    font-size: 1.2rem;\n  }\n}\n"],sourceRoot:""}]);const o=a},4442:(n,e,t)=>{t.d(e,{Z:()=>o});var r=t(4015),i=t.n(r),A=t(3645),a=t.n(A)()(i());a.push([n.id,".register {\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #38242c;\n}\n","",{version:3,sources:["webpack://./src/features/user/register/register.css"],names:[],mappings:"AAAA;EACE,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,mBAAmB;AACrB",sourcesContent:[".register {\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #38242c;\n}\n"],sourceRoot:""}]);const o=a},2878:(n,e,t)=>{n.exports=t.p+"dfd0cdb6bc8c62ac2a6f.jpg"}}]);
//# sourceMappingURL=494.js.map