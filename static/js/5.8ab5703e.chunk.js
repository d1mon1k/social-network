(this["webpackJsonpreact-samurai-way"]=this["webpackJsonpreact-samurai-way"]||[]).push([[5],{137:function(e,s,t){"use strict";var n=t(2);s.a=function(e,s,t){var r=Object(n.useRef)(null),i=Object(n.useRef)(null);return Object(n.useEffect)((function(){if(!e&&i){r.current&&r.current.disconnect();r.current=new IntersectionObserver((function(n){n[0].isIntersecting&&!s&&!e&&t()})),r.current.observe(i.current)}}),[e,i,t,s]),i}},138:function(e,s,t){e.exports={userItem:"UserItem_userItem__3mGVj",infoColumn:"UserItem_infoColumn__10dNY",userName:"UserItem_userName__3z7mB",userStatus:"UserItem_userStatus__3iMXw",newMessageBtn:"UserItem_newMessageBtn__1mfCA",userPhoto:"UserItem_userPhoto__2AdjR",btnContainer:"UserItem_btnContainer__298Wa",unfollowBtn:"UserItem_unfollowBtn__1hE1t"}},139:function(e,s,t){e.exports={usersSection:"UsersList_usersSection__21yXH",title:"UsersList_title__1n9mR",usersList:"UsersList_usersList__2FCmk",preloaderContainer:"UsersList_preloaderContainer__3QeBb",pagination:"UsersList_pagination__2DsNo",paginationContainer:"UsersList_paginationContainer__2sMGg",paginationItem:"UsersList_paginationItem__3aLNY",active:"UsersList_active__1suvb",paginationSlider:"UsersList_paginationSlider__R8DCx"}},140:function(e,s,t){"use strict";var n=t(3),r=t(9),i=t(4),a=t(11),c=t(50),o=t(138),u=t.n(o),l=t(10),g=t(34),h=t(19),b=t(0),d=function(e){var s=e.user,t=e.isFollowing,o=e.toggleFollowOnUser,d=e.createDialog,_=Object(i.i)(),m=Object(a.c)(s.name),f=function(){var e=Object(r.a)(Object(n.a)().mark((function e(){return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d(s.id);case 2:_("/messenger/".concat(s.id));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(b.jsxs)("div",{className:u.a.userItem,children:[Object(b.jsx)(h.a,{photo:s.photos.small||c.a,userId:s.id}),Object(b.jsxs)("div",{className:u.a.infoColumn,children:[Object(b.jsx)(l.b,{to:"/profile/".concat(s.id),children:Object(b.jsx)("div",{className:u.a.userName,children:m})}),Object(b.jsx)("div",{className:u.a.userStatus,children:(s.status?Object(a.e)(s.status,40):null)||"".concat(m," has no status")}),Object(b.jsx)("div",{onClick:f,className:u.a.newMessageBtn,children:"Write message"})]}),Object(b.jsx)(g.a,{disabled:t.some((function(e){return e===s.id})),callBack:function(){return o(s.id,s.followed)},children:s.followed?"Unfollow":"Follow"})]})},_=t(139),m=t.n(_);s.a=function(e){var s=e.usersList,t=e.createDialog,n=e.isSubscribePending,r=e.toggleFollowOnUser;return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{className:m.a.usersList,children:s.map((function(e){return Object(b.jsx)(d,{user:e,isFollowing:n,toggleFollowOnUser:r,createDialog:t},e.id)}))})})}},150:function(e,s,t){"use strict";t.r(s);var n=t(18),r=t(17),i=t(137),a=t(20),c=t(140),o=t(0),u=function(e){var s=e.usersData,t=e.searchInput,n=e.isSubscribePending,r=e.isUsersFetching,u=e.toggleFollowOnUser,l=e.createDialog,g=e.maxPageItemsCount,h=e.fetchUsers,b=s.items,d=s.totalItemsCount===s.items.length,_=h.bind(null,g,t,!1),m=Object(i.a)(r,d,_);return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(c.a,{usersList:b,isSubscribePending:n,toggleFollowOnUser:u,createDialog:l}),r?Object(o.jsx)(a.a,{width:"50px",height:"50px",position:"absolute"}):Object(o.jsx)("div",{style:{height:"1px"},ref:m})]})},l=t(41),g=t(79),h=t(12),b=t(4),d=t(2),_={toggleFollowOnUserThunk:g.e,createDialogThunk:l.a,fetchPeopleThunk:g.b,fetchSearchedPeopleThunk:g.d,clearUsersState:h.a},m=Object(n.b)((function(e){return{usersPage:e.users.users.people.currentPage,searchedUsersPage:e.users.searchedUsers.people.currentPage,usersList:e.users.users.people,searchedUsersList:e.users.searchedUsers.people,isSubscribePending:e.users.requests.toggleFollowOnUserPending,isUsersFetching:e.users.requests.fetchUsersPending}}),_);s.default=Object(r.compose)(m)((function(e){var s=e.usersList,t=e.searchedUsersList,n=e.isSubscribePending,r=e.isUsersFetching,i=e.toggleFollowOnUserThunk,a=e.createDialogThunk,c=e.fetchPeopleThunk,l=e.fetchSearchedPeopleThunk,g=e.clearUsersState,h=Object(b.j)().searchInput,_=h.length?l:c;return Object(d.useEffect)((function(){return window.scrollBy({behavior:"smooth",top:-9999999}),g(),_(10,h,!1),function(){g()}}),[h,c,g,_]),Object(o.jsx)(u,{searchInput:h,usersData:h.length?t:s,createDialog:a,isSubscribePending:n,toggleFollowOnUser:i,isUsersFetching:r,maxPageItemsCount:10,fetchUsers:h.length?l:c})}))}}]);
//# sourceMappingURL=5.8ab5703e.chunk.js.map