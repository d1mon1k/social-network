"use strict";(self.webpackChunkreact_samurai_way=self.webpackChunkreact_samurai_way||[]).push([[60],{3507:function(e,s,a){a.d(s,{v:function(){return l}});var n=a(3504),r=a(6074),t="Message_messageColumn__dg7kE",i="Message_avatar__2XoxZ",c="Message_name__lCP6t",o="Message_time__JMhLm",d="Message_message__2hjMw",u=a(184),l=function(e){var s=e.message,a=e.name,l=e.photo,m=e.time,h=e.userId;return(0,u.jsxs)("li",{className:t,children:[(0,u.jsx)("div",{className:i,children:(0,u.jsx)(r.Z,{userId:h,photo:l})}),(0,u.jsxs)("div",{children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(n.rU,{to:"/profile/".concat(h),className:c,children:a}),(0,u.jsx)("time",{className:o,children:m})]}),function(e){return e.split("<br />").map((function(e,s){return(0,u.jsx)("p",{className:d,children:e},s)}))}(s)]})]})}},3060:function(e,s,a){a.r(s),a.d(s,{default:function(){return m}});var n=a(3433),r=a(2791),t=a(6871),i=a(9753),c=a(7968),o=a(3507),d="MessagesList_messages__yixkg",u="MessagesList_preloaderContainer__2UCA-",l=a(184),m=function(){var e=(0,t.bx)(),s=e.dialogs,a=e.messages,m=e.interlocutorId,h=e.authProfileId,_=e.authProfilePhoto,f=e.clearMessagesState,g=e.pathName,p=e.fetchMessagesPending;(0,r.useEffect)((function(){return function(){f()}}),[g]);var x=(0,n.Z)(s).filter((function(e){return e.id===m}))[0],v=a.map((function(e){var s=e.senderId===h?_:null===x||void 0===x?void 0:x.photos.small,a=e.senderId===h?h:m;return(0,l.jsx)(o.v,{userId:a,photo:s,name:e.senderName,message:e.body,time:(0,i.fc)(e.addedAt,!0)},e.id)}));return(0,l.jsx)("ul",{className:d,children:p?(0,l.jsx)("div",{className:u,children:(0,l.jsx)(c.Z,{height:"55px",width:"55px",position:"absolute"})}):v})}}}]);
//# sourceMappingURL=60.c5a8087b.chunk.js.map