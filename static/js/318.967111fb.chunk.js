"use strict";(self.webpackChunkreact_samurai_way=self.webpackChunkreact_samurai_way||[]).push([[318],{3318:function(e,s,a){a.r(s),a.d(s,{default:function(){return z}});var i=a(364),n=a(7781),t=a(1413),l=a(6871),o=a(184),r=function(e){var s;return{isAuth:null===(s=e.auth.user)||void 0===s?void 0:s.data.login}},c=a(9596),m=a(5987),u=a(2791),_="Dialogs_dialogsPage__djCAJ",d="Dialogs_dialogs__w6BpA",g="Dialogs_dialogBlock__FJHH3",h="Dialogs_dialogsWrapper__kF3KL",f="Dialogs_conversationWrapper__qGsMU",x="Dialogs_conversation__awFeN",j="Dialogs_newMessage__qYkf3",p="DialogItem_userLink__8HCBB",v="DialogItem_active__Zs+v5",M="DialogItem_time__3AlQQ",N="DialogItem_message__z5bV6",D="DialogItem_messageCounter__x6S4T",P="DialogItem_avatar__sYULj",w="DialogItem_name__vfRmA",b=a(3504),k=a(6074),y=a(9753),A=function(e){var s=e.counter,a=e.id,i=e.lastMessage,n=e.name,t=e.photo,l=e.time;return(0,o.jsx)("li",{children:(0,o.jsxs)(b.OL,{className:(0,y.Xz)(p,v),to:"".concat(a),children:[(0,o.jsx)("div",{className:P,children:(0,o.jsx)(k.Z,{photo:t})}),(0,o.jsx)("div",{className:w,children:(0,y.Pq)(n)}),(0,o.jsx)("p",{className:N,children:(0,y.Pq)(i)}),(0,o.jsx)("time",{className:M,children:(0,y.z6)(l)}),s>0&&(0,o.jsx)("div",{className:D,children:s})]})})},S="Message_messageColumn__AW9wg",C="Message_avatar__XZA1P",E="Message_name__F1uHx",I="Message_time__WTmSM",F="Message_message__wc-sy",Z=function(e){return(0,o.jsxs)("li",{className:S,children:[(0,o.jsx)("div",{className:C,children:(0,o.jsx)(k.Z,{photo:e.photo})}),(0,o.jsxs)("div",{children:[(0,o.jsx)("span",{className:E,children:"Marina"}),(0,o.jsx)("time",{className:I,children:"20:00"})]}),(0,o.jsx)("p",{className:F,children:e.message})]})},q=a(3720),B=["dialogsPage"],W=function(e){var s=function(e){"Enter"!==e.key||e.shiftKey||(document.getElementById("form").dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0})),e.preventDefault())};return(0,o.jsx)(q.l0,{onSubmit:function(s){e.setMessages(s.newMessage),s.newMessage=""},render:function(e){return(0,o.jsx)("form",{id:"form",onSubmit:e.handleSubmit,children:(0,o.jsx)(q.gN,{name:"newMessage",placeholder:"Write a message (reduxForm)",className:j,component:"textarea",onKeyPress:s})})}})},H=function(e){var s=e.dialogsPage,a=(0,m.Z)(e,B),i=(0,u.useRef)(null);(0,u.useEffect)((function(){var e;null===(e=i.current)||void 0===e||e.scrollTo(0,99999)}),[s.messages]);var n=s.messages.map((function(e){return(0,o.jsx)(Z,{photo:a.ProfilePhoto,message:e.text},e.id)})),t=s.dialogs.map((function(e){return(0,o.jsx)(A,{id:e.id,name:e.name,lastMessage:e.lastMessage,time:e.time,counter:e.counter,photo:a.ProfilePhoto},e.id)}));return(0,o.jsxs)("div",{className:_,children:[(0,o.jsx)("div",{className:h,children:(0,o.jsx)("ul",{className:d,children:t})}),(0,o.jsxs)("div",{className:g,children:[(0,o.jsx)("div",{ref:i,className:f,children:(0,o.jsx)("ul",{className:x,children:n})}),(0,o.jsx)(W,{setMessages:a.setMessages})]})]})},L={setMessages:function(e){return{type:c.C.SET_MESSAGES,payload:e}}},T=(0,i.$j)((function(e){return{ProfilePhoto:e.profile.profile&&e.profile.profile.photos.small,dialogsPage:e.dialogsPage}}),L),z=(0,n.qC)(T,(function(e){return(0,i.$j)(r)((function(s){return s.isAuth?(0,o.jsx)(e,(0,t.Z)({},s)):(0,o.jsx)(l.Fg,{to:"/login"})}))}))(H)}}]);
//# sourceMappingURL=318.967111fb.chunk.js.map