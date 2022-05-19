"use strict";(self.webpackChunkreact_samurai_way=self.webpackChunkreact_samurai_way||[]).push([[606],{606:function(e,s,a){a.r(s),a.d(s,{default:function(){return W}});var r=a(2791),t=a(7781),n=a(364),o=a(1413),i=a(6871),l=a(184),c=function(e){var s;return{isAuth:null===(s=e.auth.user)||void 0===s?void 0:s.data.login}},u=a(4384),d=a(5861),m=a(7757),g=a.n(m),_=a(4461),h=function(e){return _.Z.get("dialogs/".concat(e,"/messages?page=1&count=20"))},f=a(1475),p=function(e){return{type:f.M.FETCH_MESSAGES_FAILURE,payload:e}},v=a(9439),x="Messenger_dialogsPage__6PmBP",j="Messenger_dialogs__PgkNj",M="Messenger_dialogBlock__aC8ZY",E="Messenger_dialogsWrapper__Bq1fm",I="Messenger_conversationWrapper__ejOeC",N="Messenger_conversation__S7Jt8",S="DialogItem_userLink__RrjAu",C="DialogItem_active__r20a8",P="DialogItem_time__pM+no",y="DialogItem_message__89jYo",A="DialogItem_messageCounter__JlTmx",D="DialogItem_avatar__n4ZKM",k="DialogItem_name__niEUB",T=a(3504),w=a(6074),F=a(9753),Z=function(e){var s=e.id,a=e.lastDialogActivity,r=e.newMessagesCounter,t=e.photo,n=e.userName,o=e.setInterlocutorPhoto;return(0,l.jsx)("li",{children:(0,l.jsxs)(T.OL,{onClick:function(){return o(t)},className:(0,F.Xz)(S,C),to:"".concat(s),children:[(0,l.jsx)("div",{className:D,children:(0,l.jsx)(w.Z,{photo:t})}),(0,l.jsx)("div",{className:k,children:(0,F.Pq)(n)}),(0,l.jsx)("p",{className:y,children:(0,F.Pq)("lorem lorem lorem lorem")}),(0,l.jsx)("time",{className:P,children:(0,F.fc)(a)}),r>0&&(0,l.jsx)("div",{className:A,children:r})]})})},L=(a(3720),"Message_messageColumn__aYgIq"),R="Message_avatar__R8hf4",U="Message_name__D2cr5",b="Message_time__0WK0X",q="Message_message__bFOLq",G=function(e){var s=e.message,a=e.name,r=e.photo,t=e.time;return(0,l.jsxs)("li",{className:L,children:[(0,l.jsx)("div",{className:R,children:(0,l.jsx)(w.Z,{photo:r})}),(0,l.jsxs)("div",{children:[(0,l.jsx)("span",{className:U,children:a}),(0,l.jsx)("time",{className:b,children:t})]}),(0,l.jsx)("p",{className:q,children:s})]})},H=function(e){var s=e.dialogs,a=e.messages,t=e.authProfileId,n=e.authProfilePhoto,o=(0,r.useState)(null),i=(0,v.Z)(o,2),c=i[0],u=i[1],d=(0,r.useRef)(null);(0,r.useEffect)((function(){var e;null===(e=d.current)||void 0===e||e.scrollTo(0,99999)}),[a]);var m=a.map((function(e){var s=e.senderId===t?n:c;return(0,l.jsx)(G,{photo:s,name:e.senderName,message:e.body,time:(0,F.fc)(e.addedAt)},e.id)})),g=s.map((function(e){return(0,l.jsx)(Z,{setInterlocutorPhoto:u,id:e.id,userName:e.userName,lastDialogActivity:e.lastDialogActivityDate,newMessagesCounter:e.newMessagesCount,photo:e.photos.small},e.id)}));return(0,l.jsxs)("div",{className:x,children:[(0,l.jsx)("div",{className:E,children:(0,l.jsx)("ul",{className:j,children:g})}),(0,l.jsx)("div",{className:M,children:(0,l.jsx)("div",{ref:d,className:I,children:(0,l.jsx)("ul",{className:N,children:m})})})]})},O={fetchDialogsThunk:function(){return function(){var e=(0,d.Z)(g().mark((function e(s){var a,r;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s({type:f.M.FETCH_DIALOGS_REQUEST}),e.next=4,_.Z.get("dialogs");case 4:a=e.sent,r=a.data,s((n=r,{type:f.M.FETCH_DIALOGS_SUCCESS,payload:n})),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),s((t="An error occurred during fetching dialogs",{type:f.M.FETCH_DIALOGS_FAILURE,payload:t}));case 13:case"end":return e.stop()}var t,n}),e,null,[[0,9]])})));return function(s){return e.apply(this,arguments)}}()},fetchMessagesThunk:function(e){return function(){var s=(0,d.Z)(g().mark((function s(a){var r,t;return g().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,a({type:f.M.FETCH_MESSAGES_REQUEST}),s.next=4,h(e);case 4:r=s.sent,(t=r.data).error?a(p(t.error)):a((n=t.items,{type:f.M.FETCH_MESSAGES_SUCCESS,payload:n})),s.next=13;break;case 9:s.prev=9,s.t0=s.catch(0),console.log(s.t0),a(p("An error occurred during fetching messages"));case 13:case"end":return s.stop()}var n}),s,null,[[0,9]])})));return function(e){return s.apply(this,arguments)}}()}},B=(0,n.$j)((function(e){var s,a,r;return{dialogs:e.messenger.dialogs,messages:e.messenger.messages,authProfileId:null===(s=e.auth.user)||void 0===s?void 0:s.data.id,authProfilePhoto:null===(a=e.auth.user)||void 0===a||null===(r=a.data.photos)||void 0===r?void 0:r.small}}),O),W=(0,t.qC)(B,(function(e){return(0,n.$j)(c)((function(s){return s.isAuth?(0,l.jsx)(e,(0,o.Z)({},s)):(0,l.jsx)(i.Fg,{to:"/login"})}))}),u.l)((function(e){var s=e.dialogs,a=e.messages,t=e.fetchDialogsThunk,n=e.fetchMessagesThunk,o=e.route,i=e.authProfileId,c=e.authProfilePhoto,u=parseInt(o.params.userId);return(0,r.useEffect)((function(){t()}),[t]),(0,r.useEffect)((function(){n(u)}),[u]),(0,l.jsx)(H,{authProfilePhoto:c,authProfileId:i,messages:a,dialogs:s})}))}}]);
//# sourceMappingURL=606.fcb48ebe.chunk.js.map