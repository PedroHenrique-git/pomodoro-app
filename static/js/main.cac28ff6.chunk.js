(this["webpackJsonppomodoro-app"]=this["webpackJsonppomodoro-app"]||[]).push([[0],{10:function(e,t,r){},11:function(e,t,r){},12:function(e,t,r){"use strict";r.r(t);var n=r(1),c=r(4),o=r.n(c),s=r(2),a=function(e){return e>=3600?new Date(1e3*e).toLocaleTimeString("pt-BR",{hour12:!1,timeZone:"GMT"}):new Date(1e3*e).toLocaleTimeString("pt-BR",{minute:"2-digit",second:"2-digit",timeZone:"GMT"})},i=r(0);function u(e){var t=e.disabled,r=e.value,n=e.onClick;return Object(i.jsx)("button",{style:t?{borderColor:"#ff4544"}:{borderColor:"#e7e7e7"},disabled:t,type:"button",onClick:n,children:r})}r(10);var l=r.p+"static/media/sound.630fbdee.mp3",d=new Audio(l);function j(){var e=Object(n.useState)(10),t=Object(s.a)(e,2),r=t[0],c=t[1],o=Object(n.useState)(!1),l=Object(s.a)(o,2),j=l[0],b=l[1],O=Object(n.useState)(!1),f=Object(s.a)(O,2),m=f[0],p=f[1],h=Object(n.useState)(!1),k=Object(s.a)(h,2),v=k[0],x=k[1],S=Object(n.useState)(0),C=Object(s.a)(S,2),w=C[0],g=C[1],y=Object(n.useState)(0),L=Object(s.a)(y,2),I=L[0],T=L[1],N=Object(n.useState)("doing nothing"),R=Object(s.a)(N,2),D=R[0],J=R[1],W=Object(n.useRef)(null),B=function(){p(!1),b(!0),c(10),J("Work"),W.current.classList.remove("rest"),W.current.classList.add("work")},E=function(e){b(!1),p(!0),e?(c(20),d.play()):c(5),J("Rest"),T(I+1),W.current.classList.remove("work"),W.current.classList.add("rest")};return Object(n.useEffect)((function(){var e=localStorage.getItem("pomodoroData");if(e){var t=JSON.parse(e);b(t.work),p(t.rest),x(!0),c(t.second),g(t.timeWorked),J(t.currentTask),T(t.pomodoroCycles),t.currentClass&&W.current.classList.add(t.currentClass)}}),[]),Object(n.useEffect)((function(){var e=0;j&&0===r&&E(0!==I&&I%4===0),m&&0===r&&B();var t={work:j,rest:m,second:r,timeWorked:w,currentTask:D,pomodoroCycles:I,currentClass:W.current.className};return localStorage.setItem("pomodoroData",JSON.stringify(t)),!j&&!m||v?clearInterval(e):e=window.setInterval((function(){c((function(e){return e-1})),g((function(e){return e+1}))}),1e3),function(){return clearInterval(e)}}),[j,r,m,v,I]),Object(i.jsx)("main",{children:Object(i.jsxs)("section",{className:"conteudo",children:[Object(i.jsxs)("h1",{children:["You are: ",D]}),Object(i.jsx)("h1",{ref:W,children:a(r)}),Object(i.jsxs)("h1",{children:["time worked: ",a(w)]}),Object(i.jsxs)("h1",{children:["pomodoro cycles: ",I]}),Object(i.jsxs)("div",{className:"controls_container",children:[Object(i.jsx)(u,{disabled:v,onClick:function(){return B()},value:"Work"}),Object(i.jsx)(u,{disabled:v,onClick:function(){return E()},value:"Rest"}),Object(i.jsx)(u,{disabled:!1,onClick:function(){return x(!v)},value:v?"Continue":"Pause"})]})]})})}function b(){return Object(i.jsx)(j,{})}r(11);o.a.render(Object(i.jsx)(n.StrictMode,{children:Object(i.jsx)(b,{})}),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.cac28ff6.chunk.js.map