"use strict";(self.webpackChunkchocolatestore=self.webpackChunkchocolatestore||[]).push([[933],{6933:(n,e,r)=>{r.d(e,{r:()=>f});var t=r(4942),i=r(885),o=r(7294),a=r(4494),s=r(5557),A=r(3379),l=r.n(A),p=r(2009);l()(p.Z,{insert:"head",singleton:!1}),p.Z.locals;var m=r(5893);function u(n,e){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.push.apply(r,t)}return r}function d(n){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(Object(r),!0).forEach((function(e){(0,t.Z)(n,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))}))}return n}function f(n){var e=n.fields,r=n.onSubmit,A=(0,a.v9)(s.LA),l=o.useState({statusCode:"",message:"",error:""}),p=(0,i.Z)(l,2),u=p[0],f=p[1],b=o.useState({}),h=(0,i.Z)(b,2),g=h[0],C=h[1];function E(n){var e=n.target,r=e.name,i=e.value;C(d(d({},g),{},(0,t.Z)({},r,i))),u.message.length>0&&0===i.length&&f({statusCode:"",message:"",error:""})}return(0,m.jsxs)("form",{className:"profile-form",onSubmit:r,children:[(0,m.jsx)("h1",{id:"profile-form__headlabel",children:e.labels.head}),(0,m.jsx)("label",{children:e.labels.labelx}),(0,m.jsx)("input",{type:e.inputs.inputx.type,name:e.inputs.inputx.name,id:e.inputs.inputx.id,placeholder:e.inputs.inputx.placeholder,minLength:e.inputs.inputx.minLength,maxLength:e.inputs.inputx.maxLength,disabled:e.inputs.inputx.disabled,pattern:e.inputs.inputx.pattern,title:e.inputs.inputx.title,required:e.inputs.inputx.required,onChange:E}),(0,m.jsx)("label",{children:e.labels.labely}),(0,m.jsx)("input",{type:e.inputs.inputy.type,name:e.inputs.inputy.name,id:e.inputs.inputy.id,placeholder:e.inputs.inputy.placeholder,disabled:e.inputs.inputy.disabled,pattern:e.inputs.inputy.pattern,minLength:e.inputs.inputy.minLength,maxLength:e.inputs.inputy.maxLength,title:e.inputs.inputy.title,required:e.inputs.inputy.required,onChange:E}),(0,m.jsx)(c,{message:A?A.message:""}),(0,m.jsx)("button",{type:"submit",disabled:!1,children:e.labels.submit})]})}function c(n){var e=n.message;return(0,m.jsx)("p",{id:"form-warning",children:e})}},4306:(n,e,r)=>{function t(n){var e=Array.from(n).filter((function(n){return"INPUT"===n.nodeName||"SELECT"===n.nodeName&&!1===n.multiple||"TEXTAREA"===n.nodeName})).map((function(n){return[n.name,"file"===n.type?n.files[0].name:n.value]}));return Object.fromEntries(e)}function i(n){return Array.from(n.selectedOptions).map((function(n){return{id:n.value,cname:n.text}}))}function o(n){return Array.from(n.selectedOptions).map((function(n){return{id:n.value}}))}r.d(e,{Ms:()=>t,qu:()=>i,DS:()=>o})},4933:(n,e,r)=>{r.r(e),r.d(e,{default:()=>l}),r(7294);var t=r(4494),i=r(3701),o=r(6933),a=r(4306),s=r(5557),A=r(5893);const l=function(){var n=(0,t.I0)(),e=(0,t.v9)(s.LA);return(0,A.jsxs)("div",{className:"profile-changeform",children:[(0,A.jsx)(o.r,{onSubmit:function(e){e.preventDefault(),n((0,i.Cp)((0,a.Ms)(e.currentTarget.elements)))},fields:{inputs:{inputy:{type:"password",name:"newPassword",pattern:new RegExp(/(?=.*[A-Za-z])[A-Za-z\d!]{6,}/).toString().slice(1,-1),required:!0,title:"Provide a password with at least 6 characters",minLength:6,maxLength:128,id:"newPassword",placeholder:"New Password"},inputx:{type:"password",name:"currentPassword",id:"currentPassword",placeholder:"Current Password",pattern:new RegExp(/(?=.*[A-Za-z])[A-Za-z\d!]{6,}/).toString().slice(1,-1),required:!0,title:"Provide a password with at least 6 characters",minLength:6,maxLength:128}},labels:{head:"Change Password",submit:"Submit",labelx:"Current Password",labely:"New Password"}}}),(0,A.jsx)("p",{className:"profile-warnings",children:e&&401===(null==e?void 0:e.statusCode)?"Invalid credentials!":null})]})}},2009:(n,e,r)=>{r.d(e,{Z:()=>s});var t=r(4015),i=r.n(t),o=r(3645),a=r.n(o)()(i());a.push([n.id,".profile-form {\n  font-family: 'Montserrat';\n  position: relative;\n  padding: 2.5rem;\n  background-color: #232946;\n}\n\n.profile-form h1 {\n  color: #f5f5f5;\n  font-size: 2.4rem;\n  z-index: 9;\n  margin-bottom: 1rem;\n}\n\n.profile-form label {\n  line-height: 1;\n  display: block;\n  color: #f5f5f5;\n  font-size: 1rem;\n  font-weight: 300;\n  margin: 0.5rem 0rem 0.5rem 0rem;\n}\n\n.profile-form input {\n  font-family: 'Montserrat', sans-serif;\n  width: 100%;\n  font-size: 1rem;\n  padding: .8rem;\n  margin-bottom: 1rem;\n  border-radius: 4px;\n  border: none;\n  outline: 0;\n}\n\n.profile-form button[type=submit] {\n  width: 100%;\n  font-family: 'Roboto', sans-serif;\n  font-size: 1em;\n  background: #f5f5f5;\n  color: #131313;\n  outline: 0;\n  border: 0;\n  border: none;\n  margin-top: 1em;\n  padding: 15px;\n  letter-spacing: 1px;\n  cursor: pointer;\n  transition: all .5s;\n}\n\n.profile-form button[type=submit]:hover {\n  background: #dbdbdb;\n}\n\n.profile-form .warning-text {\n  display: none;\n  font-size: 1rem;\n  color: #ff8906;\n  margin: 1px 0px 10px 0px;\n}\n\n@media (max-width: 620px) {\n  .profile-form {\n    height: inherit;\n    width: 100%;\n  }\n}\n","",{version:3,sources:["webpack://./src/features/forms/profile-form/profile-form.css"],names:[],mappings:"AAAA;EACE,yBAAyB;EACzB,kBAAkB;EAClB,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,iBAAiB;EACjB,UAAU;EACV,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,cAAc;EACd,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,+BAA+B;AACjC;;AAEA;EACE,qCAAqC;EACrC,WAAW;EACX,eAAe;EACf,cAAc;EACd,mBAAmB;EACnB,kBAAkB;EAClB,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,iCAAiC;EACjC,cAAc;EACd,mBAAmB;EACnB,cAAc;EACd,UAAU;EACV,SAAS;EACT,YAAY;EACZ,eAAe;EACf,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,cAAc;EACd,wBAAwB;AAC1B;;AAEA;EACE;IACE,eAAe;IACf,WAAW;EACb;AACF",sourcesContent:[".profile-form {\n  font-family: 'Montserrat';\n  position: relative;\n  padding: 2.5rem;\n  background-color: #232946;\n}\n\n.profile-form h1 {\n  color: #f5f5f5;\n  font-size: 2.4rem;\n  z-index: 9;\n  margin-bottom: 1rem;\n}\n\n.profile-form label {\n  line-height: 1;\n  display: block;\n  color: #f5f5f5;\n  font-size: 1rem;\n  font-weight: 300;\n  margin: 0.5rem 0rem 0.5rem 0rem;\n}\n\n.profile-form input {\n  font-family: 'Montserrat', sans-serif;\n  width: 100%;\n  font-size: 1rem;\n  padding: .8rem;\n  margin-bottom: 1rem;\n  border-radius: 4px;\n  border: none;\n  outline: 0;\n}\n\n.profile-form button[type=submit] {\n  width: 100%;\n  font-family: 'Roboto', sans-serif;\n  font-size: 1em;\n  background: #f5f5f5;\n  color: #131313;\n  outline: 0;\n  border: 0;\n  border: none;\n  margin-top: 1em;\n  padding: 15px;\n  letter-spacing: 1px;\n  cursor: pointer;\n  transition: all .5s;\n}\n\n.profile-form button[type=submit]:hover {\n  background: #dbdbdb;\n}\n\n.profile-form .warning-text {\n  display: none;\n  font-size: 1rem;\n  color: #ff8906;\n  margin: 1px 0px 10px 0px;\n}\n\n@media (max-width: 620px) {\n  .profile-form {\n    height: inherit;\n    width: 100%;\n  }\n}\n"],sourceRoot:""}]);const s=a}}]);
//# sourceMappingURL=933.js.map