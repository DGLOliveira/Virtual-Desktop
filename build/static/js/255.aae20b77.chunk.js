"use strict";(self.webpackChunkpc=self.webpackChunkpc||[]).push([[255],{255:(e,t,a)=>{a.r(t),a.d(t,{default:()=>D});var s=a(5043),r=a(184),o=a(1462);const i=JSON.parse('[{"Level":0,"Bars":15,"Matrix":[{"x":1,"y":2,"w":4,"h":3,"s":1},{"x":7,"y":2,"w":4,"h":3,"s":1},{"x":13,"y":2,"w":4,"h":3,"s":1},{"x":19,"y":2,"w":4,"h":3,"s":1},{"x":25,"y":2,"w":4,"h":3,"s":1},{"x":1,"y":6,"w":4,"h":3,"s":1},{"x":7,"y":6,"w":4,"h":3,"s":1},{"x":13,"y":6,"w":4,"h":3,"s":1},{"x":19,"y":6,"w":4,"h":3,"s":1},{"x":25,"y":6,"w":4,"h":3,"s":1},{"x":1,"y":10,"w":4,"h":3,"s":1},{"x":7,"y":10,"w":4,"h":3,"s":1},{"x":13,"y":10,"w":4,"h":3,"s":1},{"x":19,"y":10,"w":4,"h":3,"s":1},{"x":25,"y":10,"w":4,"h":3,"s":1}]},{"Level":1,"Bars":15,"Matrix":[{"x":0,"y":2,"w":4,"h":3,"s":1},{"x":7,"y":3,"w":2,"h":3,"s":1},{"x":14,"y":2,"w":2,"h":3,"s":1},{"x":21,"y":3,"w":2,"h":3,"s":1},{"x":26,"y":2,"w":4,"h":3,"s":1},{"x":0,"y":6,"w":4,"h":3,"s":1},{"x":7,"y":7,"w":2,"h":3,"s":1},{"x":14,"y":6,"w":2,"h":3,"s":1},{"x":21,"y":7,"w":2,"h":3,"s":1},{"x":26,"y":6,"w":4,"h":3,"s":1},{"x":0,"y":10,"w":4,"h":3,"s":1},{"x":7,"y":11,"w":2,"h":3,"s":1},{"x":14,"y":10,"w":2,"h":3,"s":1},{"x":21,"y":11,"w":2,"h":3,"s":1},{"x":26,"y":10,"w":4,"h":3,"s":1}]},{"Level":2,"Bars":15,"Matrix":[{"x":0,"y":2,"w":2,"h":3,"s":1},{"x":7,"y":4,"w":2,"h":3,"s":1},{"x":14,"y":2,"w":2,"h":3,"s":1},{"x":21,"y":4,"w":2,"h":3,"s":1},{"x":26,"y":2,"w":2,"h":3,"s":1},{"x":0,"y":6,"w":2,"h":3,"s":1},{"x":7,"y":7,"w":2,"h":3,"s":1},{"x":14,"y":6,"w":2,"h":3,"s":1},{"x":21,"y":7,"w":2,"h":3,"s":1},{"x":26,"y":6,"w":2,"h":3,"s":1},{"x":0,"y":16,"w":2,"h":3,"s":1},{"x":7,"y":11,"w":2,"h":3,"s":1},{"x":14,"y":16,"w":2,"h":3,"s":1},{"x":21,"y":11,"w":2,"h":3,"s":1},{"x":26,"y":16,"w":2,"h":3,"s":1}]},{"Level":3,"Bars":0,"Matrix":[]}]'),l=(e,t,a)=>{e.fillStyle="silver",e.fillRect(0,0,t,1),e.fillRect(0,0,1,a),e.fillRect(t-1,0,1,a),e.fillRect(0,a-1,t,1)};var n=a(579);const c=60,d=1e3/c,h=30,y=30,u={x:12,y:27,w:6},x={x:15,y:50,r:.5,dirX:.25,dirY:-.25},w={x:15,y:52,r:.25,dirX:0,dirY:-.25,t:-5,color:""};function f(e){let{controls:t,updateScoreboard:a,isSelected:r,gameState:o,setGameState:f}=e;const p=(0,s.useRef)(null),[S,m]=(0,s.useState)(JSON.parse(JSON.stringify(i))),[b,g]=(0,s.useState)(0),[k,v]=(0,s.useState)(S[b]),[P,j]=(0,s.useState)(k.Bars),[M,C]=(0,s.useState)(0),[E,T]=(0,s.useState)(0);let[O,R]=(0,s.useState)(Object.create(u)),[B,F]=(0,s.useState)(Object.create(x)),[N]=(0,s.useState)(Object.create(w));N.color="blue";let[G]=(0,s.useState)(Object.create(w));G.color="green";let[D]=(0,s.useState)(Object.create(w));D.color="red";let[L]=(0,s.useState)(Object.create(w));L.color="yellow";let[A]=(0,s.useState)(Object.create(w));A.color="cyan";let[K]=(0,s.useState)(Object.create(w));K.color="magenta";let[Y]=(0,s.useState)(Object.create(w));Y.color="white";const I={time:0,score:0,gameState:"Start"};let[W,X]=(0,s.useState)(0);(0,s.useEffect)((()=>{t.pause&&("Play"===o?f("Pause"):"Pause"===o?f("Play"):"Win"!==o&&"End"!==o&&"Start"!==o||f("Restart")),t.left&&!t.right&&O.x+O.w>O.w&&(O.x=O.x-1),t.right&&!t.left&&O.x+O.w<y&&(O.x=O.x+1)}),[t]);const U=e=>{e.fillStyle="black",e.fillRect(0,0,e.canvas.width,e.canvas.height)},V=(e,t,a,s)=>{for(let r=0;r<12;r++)e.fillStyle=s.color,e.scale(1,.5),e.beginPath(),e.arc(s.x*t+Math.cos(2*Math.PI/12*r)*s.t*2*t,s.y*a+2*Math.sin(2*Math.PI/12*r)*s.t*2*a,s.r/1*t,0,2*Math.PI),e.fill(),e.closePath(),e.scale(1,2)},J=(e,t,a,s)=>{switch(U(e),e.fillStyle="red",e.font="40px monospace",s){case 4:default:e.fillText("Next Level",5*t,17*a,500);break;case 3:e.fillText("3 sec",9*t,17*a,500);break;case 2:e.fillText("2 sec",9*t,17*a,500);break;case 1:e.fillText("1 sec",9*t,17*a,500)}},H=(e,t,a)=>{let s,r;s=O.x,r=O.y,e.fillStyle="cyan",e.fillRect(s*t,r*a,O.w*t,a)},q=(e,t,a,s)=>{let r;switch(s.h){case 3:r="green";break;case 2:r="yellow";break;case 1:r="orange";break;default:r="blue"}e.fillStyle=r,e.fillRect(s.x*t,s.y*a,s.w*t,a)},Q=(e,t,a)=>{for(let s=0;s<k.Bars;s++)k.Matrix[s].h>0&&q(e,t,a,k.Matrix[s])},Z=e=>{e.h-1>=0&&(e.h=e.h-1,W+=e.s,X(W)),0===e.h&&(j(P-1),P-1===0&&f("LevelUp"))},$=e=>{let t;0!==e.x&&e.x!==y||(e.dirX=-e.dirX),0===e.y?e.dirY=-e.dirY:e.y===2*h&&f("End"),e.y+e.r===2*O.y&&e.x>=O.x&&e.x<=O.x+O.w&&(e.dirY=-e.dirY);for(let a=0;a<k.Bars;a++)t=k.Matrix[a],t.h>0&&e.x+e.r>=t.x&&e.x-e.r<=t.x+t.w&&e.y+e.r>=2*t.y&&e.y-e.r<=2*(t.y+1)&&(e.x+e.r>t.x&&e.x-e.r<t.x+t.w&&(e.dirY=-e.dirY,Z(t)),e.y+e.r>2*t.y&&e.y-e.r<2*(t.y+1)&&(e.dirX=-e.dirX,Z(t)))},z=(e,t,a,s)=>{e.fillStyle="#FFFFFF",e.scale(1,.5),e.beginPath(),e.arc(s.x*t,s.y*a,s.r*t,0,2*Math.PI),e.fill(),e.closePath(),e.scale(1,2)};return(0,s.useEffect)((()=>{const e=p.current.getContext("2d");let t,s=e.canvas.width/y,r=e.canvas.height/h;switch(o){case"Play":U(e),l(e,e.canvas.width,e.canvas.height),H(e,s,r),Q(e,s,r),B.x=B.x+B.dirX,B.y=B.y+B.dirY,$(B),z(e,s,r,B),setTimeout((()=>{C(M+1)}),[d]);break;case"Pause":((e,t,a)=>{e.fillStyle="red",e.font="40px monospace",e.fillText("Paused",8*t,17*a,500)})(e,s,r);break;case"End":((e,t,a)=>{e.fillStyle="red",e.font="40px monospace",e.fillText("Game Over",5*t,17*a,500)})(e,s,r);break;case"Restart":m(JSON.parse(JSON.stringify(i))),g(0),v(S[b]),j(k.Bars),F(Object.create(x)),R(Object.create(u)),X(0),C(1),f("Play");break;case"LevelUp":b+1===3?f("Win"):(J(e,s,r,4),setTimeout((()=>{U(e),J(e,s,r,3)}),[1e3]),setTimeout((()=>{J(e,s,r,2)}),[2e3]),setTimeout((()=>{J(e,s,r,1)}),[3e3]),setTimeout((()=>{g(b+1),v(S[b+1]),j(k.Bars),F(Object.create(x)),U(e),Q(e,s,r),f("Play")}),[4e3]));break;case"Win":v(S[3]),((e,t,a)=>{U(e),e.fillStyle="red",e.font="40px monospace",e.fillText("You Win",8*t,17*a,500)})(e,s,r),H(e,s,r),((e,t,a)=>{let s;for(let r=0;r<=6;r++){switch(r){case 0:s=N;break;case 1:s=G;break;case 2:s=D;break;case 3:s=L;break;case 4:s=A;break;case 5:s=K;break;case 6:s=Y}s.t<=-5?(s.t=Math.floor(4*Math.random())+1,s.x=O.x+O.w/2,s.y=52,s.dirX=(Math.random()-.5)/8,s.dirY=-.25):s.t>3?s.t=s.t-1/c:s.t>0?(s.x=s.x+s.dirX,s.y=s.y+s.dirY,$(s),z(e,t,a,s),s.t=s.t-1/c):s.t>-5&&(V(e,t,a,s),s.t=s.t-1/c)}})(e,s,r),setTimeout((()=>{T(E+1)}),[d]);break;default:U(e)}I.time=Math.floor(M/c),I.score=W,I.gameState=o,a(I);const n=()=>{t=window.requestAnimationFrame(n)};return n(),()=>{window.cancelAnimationFrame(t)}}),[M,E,o]),(0,n.jsx)("canvas",{ref:p})}const p=e=>{let{controls:t,updateScoreboard:a,isSelected:r,gameState:o,setGameState:i}=e;let c=(0,s.useRef)(null),[d,h]=(0,s.useState)(!1),[y]=(0,s.useState)({x:0,y:0}),[u,x]=(0,s.useState)(0),[w]=(0,s.useState)({direction:"right",x:0,y:0}),[f,p]=(0,s.useState)("right"),[S,m]=(0,s.useState)({x:[],y:[]}),[b,g]=(0,s.useState)(!1);const k={time:0,score:0,gameState:"Start"};(0,s.useEffect)((()=>{t.pause&&t.pause&&("Play"===o?i("Pause"):"Pause"===o?i("Play"):"Win"!==o&&"End"!==o&&"Start"!==o||i("Restart")),void 0===S.x[0]?t.up?w.direction="up":t.down?w.direction="down":t.left?w.direction="left":t.right&&(w.direction="right"):t.up&&"down"!==f?w.direction="up":t.down&&"up"!==f?w.direction="down":t.left&&"right"!==f?w.direction="left":t.right&&"left"!==f&&(w.direction="right")}),[t]);const v=(e,t,a)=>{e.fillStyle="#000000",e.fillRect(0,0,t,a)};let[P,j]=(0,s.useState)(0);return(0,s.useEffect)((()=>{const e=c.current.getContext("2d");let t,s=e.canvas.width/30,r=e.canvas.height/30;"Play"===o?(v(e,e.canvas.width,e.canvas.height),l(e,e.canvas.width,e.canvas.height),((e,t,a)=>{let s,r,o,i=!1;if(d)s=y.x,r=y.y;else{if(y.x=Math.floor(30*Math.random()),y.y=Math.floor(30*Math.random()),void 0===S.x[0])for(;y.x===w.x&&y.y===w.y;)y.x=Math.floor(30*Math.random()),y.y=Math.floor(30*Math.random());else{for(let e=0;e<S.x.length;e++)y.x===S.x[e]&&(o=!0),y.y===S.y[e]&&(i=!0);for(;!0===o&&!0===i;){y.x=Math.floor(30*Math.random()),y.y=Math.floor(30*Math.random());let e=!1,t=!1;for(let a=0;a<S.x.length;a++)y.x===S.x[a]&&(e=!0),y.y===S.y[a]&&(t=!0);o=e,i=t}}s=y.x,r=y.y,h(!0)}e.fillStyle="#00FF00",e.fillRect(s*t,r*a,t,a)})(e,s,r),((e,t,a)=>{let s,r;if(b)switch(w.direction){case"right":s=w.x+1,r=w.y,w.x=w.x+1;break;case"left":s=w.x-1,r=w.y,w.x=w.x-1;break;case"up":s=w.x,r=w.y-1,w.y=w.y-1;break;case"down":s=w.x,r=w.y+1,w.y=w.y+1}else s=10*t,r=10*a,g(!0),w.x=10,w.y=10;if(p(w.direction),void 0!==S.x[2])for(let o=2;o<S.x.length;o++)S.x[o]===w.x&&S.y[o]===w.y&&i("End");w.x>=30||w.x<0||w.y<0||w.y>=30?i("End"):y.x===w.x&&y.y===w.y&&(h(!1),x(u+1),S.x.unshift(w.x),S.y.unshift(w.y)),e.fillStyle="#00FFFF",e.fillRect(s*t,r*a,t,a)})(e,s,r),((e,t,a)=>{for(let s=0;s<S.x.length;s++)e.fillStyle="#00FFFF",e.fillRect(S.x[s]*t,S.y[s]*a,t,a);S.x.unshift(w.x),S.y.unshift(w.y),S.x.pop(),S.y.pop()})(e,s,r),setTimeout((()=>{j(P+1)}),[1e3/(u/2+4)])):"Pause"===o?((e,t,a)=>{v(e,t,a),e.fillStyle="#FF0000",e.font="20px monospace",e.fillText("Paused",8*t,17*a,500)})(e,s,r):"End"===o?(v(e,e.canvas.width,e.canvas.height),((e,t,a)=>{v(e,t,a),e.fillStyle="#FF0000",e.font="20px monospace",e.fillText("Game Over",5*t,17*a,500)})(e,s,r)):"Restart"===o&&(i("Play"),j(1),h(!1),g(!1),x(0),m({x:[],y:[]})),k.time=Math.floor(P/(u/2+4)),k.score=u,k.gameState=o,a(k);const n=()=>{t=window.requestAnimationFrame(n)};return n(),()=>{window.cancelAnimationFrame(t)}}),[P,o]),(0,n.jsx)("canvas",{height:"150",width:"150",ref:c})},S=JSON.parse('{"1":{"Level":1,"Enemies":72,"Matrix":[[0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0],[0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0],[0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,9,0,0,9,0,9,0,0,9,0,9,0,0,9,0,9,0,9,0,9,0,0,9,0]]}}'),m=60,b=1e3/m,g=150,k=300,v=10,P={id:1,x:10,y:10,row:0,life:1,currSprite:1,totalSprites:2,w:10,h:10,hit:!1,color:"green",sprites:{1:[[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,1,0,0,1,1,0,0,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,1,0,1,1,0,1,1,0],[1,1,0,0,1,1,0,0,1,1],[1,0,0,0,0,0,0,0,0,1]],2:[[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,1,0,0,1,1,0,0,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[0,0,1,0,1,1,0,1,0,0],[0,1,1,0,1,1,0,1,1,0],[0,1,0,0,0,0,0,0,1,1]]}},j={id:2,x:10,y:10,row:0,life:2,hit:!1,currSprite:1,totalSprites:2,w:10,h:10,color:"red",sprites:{1:[[0,1,0,0,0,0,0,0,1,0],[0,1,1,0,0,0,0,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,1,0,1,1,1,1,0,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0],[1,1,1,1,0,0,1,1,1,1],[1,1,0,0,0,0,0,0,1,1],[0,1,1,0,0,0,0,1,1,0],[0,0,1,1,0,0,1,1,0,0]],2:[[0,0,1,0,0,0,0,1,0,0],[0,1,1,0,0,0,0,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,1,0,1,1,1,1,0,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0],[1,1,1,1,0,0,1,1,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[0,1,1,1,0,0,1,1,1,0]]}},M={id:3,x:10,y:10,row:0,life:3,hit:!1,currSprite:1,totalSprites:2,w:10,h:10,color:"cyan",sprites:{1:[[0,1,1,0,0,0,0,1,1,0],[0,0,1,0,0,0,0,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,0,1,1,1,1,0,1,1],[1,1,0,0,1,1,0,0,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,0,1],[1,0,1,0,1,1,0,1,0,1],[1,0,0,0,0,0,0,0,0,1]],2:[[0,0,1,0,0,0,0,1,0,0],[0,0,1,0,0,0,0,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,0,1,1,1,1,0,1,1],[1,1,0,0,1,1,0,0,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,0,1],[1,0,1,0,1,1,0,1,0,1],[1,1,0,0,0,0,0,0,1,1]]}},C={id:8,x:10,y:10,life:1,hit:!1,currSprite:1,totalSprites:2,w:20,h:10,color:"magenta",sprites:{1:[[0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0],[0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0],[0,0,1,1,0,0,0,0,1,0,0,1,0,0,0,0,1,1,0,0]],2:[[0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0],[0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[1,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0],[0,0,1,1,0,0,0,0,1,0,0,1,0,0,0,0,1,1,0,0]]}},E={id:10,x:10,y:130,speed:2,move:"none",shooting:!1,cooling:0,currSprite:1,w:10,h:10,color:"white",cooldown:250,sprites:{1:[[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,1,1,1,1,0,0,0],[0,1,0,1,1,1,1,0,1,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,0,0,1,0,0,1,0,0,1]]}},T={id:9,x:10,y:10,currSprite:1,w:10,h:10,color:"gray",sprites:{1:[[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0]]}},O={id:"player",x:10,y:10,h:9,w:2,speed:5,color:"white",currSprite:1,totalSprites:2,sprites:{1:[[1,1],[1,0],[1,1],[0,1],[1,1],[1,0],[1,1],[0,1],[1,1]],2:[[1,1],[0,1],[1,1],[1,0],[1,1],[0,1],[1,1],[1,0],[1,1]]}},R={id:"invader",x:10,y:10,currSprite:1,totalSprites:1,w:2,h:9,speed:2,color:"yellow",sprites:{1:[[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]]}};function B(e){let{controls:t,updateScoreboard:a,isSelected:r,gameState:o,setGameState:i}=e;const c=(0,s.useRef)(null),[d,h]=(0,s.useState)(0),[y,u]=(0,s.useState)(3),[x,w]=(0,s.useState)(1),[f,p]=(0,s.useState)(0),[B,F]=(0,s.useState)(0),[N,G]=(0,s.useState)({index:0,rows:[]}),[D,L]=(0,s.useState)([]),[A,K]=(0,s.useState)([]),[Y,I]=(0,s.useState)([]),W=500;let[X,U]=(0,s.useState)(Object.create(E));const V={time:0,score:0,gameState:"Start"};(0,s.useEffect)((()=>{if(t.pause)switch(o){case"Play":i("Pause");break;case"Pause":i("Play");break;case"Win":case"End":case"Start":i("Restart")}"Play"===o&&(t.left&&!t.right?X.move="left":t.right&&!t.left?X.move="right":t.left&&t.right?X.move="none":t.left||t.right||(X.move="none"),t.up?X.shooting=!0:t.up||(X.shooting=!1))}),[t]);const J=e=>{e.fillStyle="black",e.fillRect(0,0,e.canvas.width,e.canvas.height)},H=(e,t)=>{!0===t.hit?e.fillStyle="white":e.fillStyle=t.color;for(let a=0;a<t.sprites[t.currSprite].length;a++)for(let s=0;s<t.sprites[t.currSprite][a].length;s++)1===t.sprites[t.currSprite][a][s]&&e.fillRect(t.x+s,t.y+a,1,1);t.sprites.length>1&&(t.currSprite<t.sprites.length-1?t.currSprite++:t.currSprite=1)},q=e=>{for(let t=0;t<D.length;t++)H(e,D[t]);for(let t=0;t<A.length;t++)H(e,A[t]);H(e,X),(e=>{let t=0,a=0,s=0;if(Y.length>0)for(let r=0;r<Y.length;r++){Y[r].decay<=166.66666666666666?t=Math.floor(255*Y[r].decay/166.66666666666666):Y[r].decay<=1e3/3?(t=255,a=Math.floor(255*(Y[r].decay-166.66666666666666)/166.66666666666666)):(t=255,a=255,s=Math.floor(255*(Y[r].decay-1e3/3)/166.66666666666666)),e.fillStyle="rgb("+t+","+a+","+s+")";let o=2*Y[r].decay/(W+Y[r].decay),i=Y[r].w/2*o-10;e.fillRect(Y[r].x+2*i/3,Y[r].y+2*i/3,2,2),e.fillRect(Y[r].x-2*i/3,Y[r].y+2*i/3,2,2),e.fillRect(Y[r].x+2*i/3,Y[r].y-2*i/3,2,2),e.fillRect(Y[r].x-2*i/3,Y[r].y-2*i/3,2,2),e.fillRect(Y[r].x+i,Y[r].y,2,2),e.fillRect(Y[r].x-i,Y[r].y,2,2),e.fillRect(Y[r].x,Y[r].y+i,2,2),e.fillRect(Y[r].x,Y[r].y-i,2,2)}})(e)},Q=e=>{let t={x:e.x+e.w/2-1,y:e.y+e.h/2-1,w:e.w,h:e.h,decay:W};Y.push(t),I(Y)},Z=e=>{D[e].life-1>0?(D[e].life=D[e].life-1,D[e].hit=!0,h(d+5),setTimeout((()=>{D[e].hit=!1}),[X.cooldown/2])):(Q(D[e]),8!==D[e].id?(F(B-1),h(d+10)):h(d+150),D.splice(e,1)),L(D)},$=e=>{Q(D[e])},z=e=>{let t=!1;for(let a=0;a<D.length;a++)"player"===A[e].id?A[e].x>D[a].x&&A[e].x<D[a].x+D[a].w&&A[e].y>D[a].y&&A[e].y<D[a].y+D[a].h&&(t=!0,9===D[a].id?$(a):Z(a)):A[e].x>X.x&&A[e].x<X.x+X.w&&A[e].y>X.y-X.h&&A[e].y<X.y?(t=!0,y-1>=0?(u(y-1),Q(X)):i("End")):A[e].x>D[a].x&&A[e].x<D[a].x+D[a].w&&A[e].y>D[a].y-D[a].h&&A[e].y<D[a].y&&9===D[a].id&&(t=!0,$(a));return t},_=()=>{f*b%(1200*b)===0&&(()=>{let e=Object.create(C);Math.random()>.5?(e.x=0,e.speed=1):(e.x=k-e.w,e.speed=-1),e.y=2,D.push(e),L(D)})(),(()=>{let e={};!0===X.shooting&&0===X.cooling&&(e=Object.create(O),e.x=X.x-1+X.w/2,e.y=X.y,A.push(e),X.cooling=X.cooldown,setTimeout((()=>{X.cooling=0}),[X.cooldown]),K(A))})(),(()=>{let e={},t=Math.random(),a=Math.floor(Math.random()*B);t>.95&&(e=Object.create(R),e.x=D[a].x+X.w/2,e.y=D[a].y,A.push(e),K(A))})(),(()=>{let e=[];if(A.length>0){for(let t=0;t<A.length;t++)z(t)||("player"===A[t].id?A[t].y>0&&(A[t].y-=A[t].speed,A[t].currSprite<A[t].totalSprites?A[t].currSprite=A[t].currSprite+1:A[t].currSprite=1,e.push(A[t])):A[t].y<g&&(A[t].y+=A[t].speed,e.push(A[t])));K(e)}})(),(()=>{if(Y.length>0){for(let e=0;e<Y.length;e++)Y[e].decay-b>0?Y[e].decay=Y[e].decay-b:Y.splice(e,1);I(Y)}})(),"left"===X.move&&X.x+X.w>X.w?X.x=X.x-X.speed:"right"===X.move&&X.x+X.w<k&&(X.x=X.x+X.speed),(()=>{switch(N.index>=B&&(N.index=0),N.rows[D[N.index].row]){case"left":D[N.index].x>2?D[N.index].x=D[N.index].x-1:(N.rows[D[N.index].row]="right",D[N.index].x=D[N.index].x+1);break;case"right":D[N.index].x+D[N.index].w<k-1?D[N.index].x=D[N.index].x+1:N.rows[D[N.index].row]="left"}D[N.index].currSprite<D[N.index].totalSprites?D[N.index].currSprite=D[N.index].currSprite+1:D[N.index].currSprite=1,N.index++;for(let e=0;e<D.length;e++)8===D[e].id&&(D[e].x+D[e].w>0&&D[e].x<k?(D[e].x=D[e].x+D[e].speed,D[e].currSprite<D[e].totalSprites?D[e].currSprite=D[e].currSprite+1:D[e].currSprite=1):D.splice(e,1));L(D),G(N)})()};return(0,s.useEffect)((()=>{const e=c.current.getContext("2d");let t;switch(o){case"Play":y>=0&&B>0?(J(e),l(e,e.canvas.width,e.canvas.height),_(),q(e),r=v,n=v,(s=e).fillStyle="red",s.font="10px monospace",s.fillText("LIFE:"+y,r/2,g-n/4,500),setTimeout((()=>{p(f+1)}),[b])):y<0?i("End"):0===B&&i("Win");break;case"Pause":((e,t,a)=>{e.fillStyle="red",e.font="40px monospace",e.fillText("Paused",8*t,8*a,500)})(e,v,v);break;case"Win":((e,t,a)=>{J(e),e.fillStyle="red",e.font="40px monospace",e.fillText("You Win",7*t,8*a,500)})(e,v,v);break;case"End":((e,t,a)=>{e.fillStyle="red",e.font="40px monospace",e.fillText("Game Over",5*t,8*a,500)})(e,v,v);break;case"Start":default:break;case"Restart":w(1),h(0),u(3),I([]),K([]),(()=>{let e={},t=[],a={index:0,rows:[]};for(let s=0;s<S[x].Matrix.length;s++)for(let r=0;r<S[x].Matrix[s].length;r++)switch(S[x].Matrix[s][r]){case 1:e=Object.create(P),e.x=r*v*1.2,e.y=15+s*v*1.2,e.row=s,t.push(e),void 0===a.rows[s]&&a.rows.push("right");break;case 2:e=Object.create(j),e.x=r*v*1.2,e.y=15+s*v*1.2,e.row=s,t.push(e),void 0===a.rows[s]&&a.rows.push("right");break;case 3:e=Object.create(M),e.x=r*v*1.2,e.y=15+s*v*1.2,e.row=s,t.push(e),void 0===a.rows[s]&&a.rows.push("right");break;case 9:e=Object.create(T),e.x=r*v*1.2,e.y=5+s*v*1.2,t.push(e)}F(S[x].Enemies),L(t),G(a)})(),U(Object.create(E)),p(1),i("Play")}var s,r,n;V.time=Math.floor(f/m),V.score=d,V.gameState=o,a(V);const k=()=>{t=window.requestAnimationFrame(k)};return k(),()=>{window.cancelAnimationFrame(t)}}),[o,f]),(0,n.jsx)("canvas",{ref:c,width:300,height:150})}const F=(e,t,a,s,r)=>{switch(e){case"Keybinds":r.setShowKeybindDialog(!r.showKeybindDialog),t(!1);break;case"Play / Pause":"Play"===r.gameState?r.setGameState("Pause"):"Pause"===r.gameState&&r.setGameState("Play"),t(!1);break;case"New":r.setGameState("Restart"),t(!1);break;case"scoreboard":r.setShowScoreboard(!r.showScoreboard),t(!1);break;case"touchscreenControls":r.setShowControls(!r.showControls),t(!1);break;case!1:break;default:t(!1)}},N=(e,t,a)=>{if(null===e)t({Game:{"New Game":{action:"New",keybind:"Alt+N",disabled:!0},"Play / Pause":{action:"Play / Pause",keybind:"P",disabled:!0},LineBreak1:{},Keybinds:{action:"Keybinds",disabled:!1},LineBreak2:{},Close:{action:"Close",keybind:"Alt+Shift+F4",disabled:!1}},View:{Scoreboard:{action:"scoreboard",checkbox:!0,disabled:!1},"Touchscreen Controls":{action:"touchscreenControls",checkbox:!0,disabled:!1}},Help:{Help:{action:"help",keybind:"F1",disabled:!0,title:"Not Implemented"},About:{action:"about",disabled:!0,title:"Not Implemented"}}});else{t({...e,Game:{...e.Game,"New Game":{...e.Game["New Game"],disabled:!a.gameChoice},"Play / Pause":{...e.Game["Play / Pause"],disabled:!a.gameChoice}},View:{...e.View,Scoreboard:{...e.View.Scoreboard,checkbox:a.showScoreboard},"Touchscreen Controls":{...e.View["Touchscreen Controls"],checkbox:a.showControls}}})}},G=e=>{let{showKeybindDialog:t,setShowKeybindDialog:a,setAppDialog:r,keyboard:o,setKeyboard:i}=e;const[l,c]=(0,s.useState)(structuredClone(o)),[d,h]=(0,s.useState)(""),[y,u]=(0,s.useState)(0),x=(0,n.jsxs)("div",{children:[Object.keys(l).map((e=>(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"row",width:"100%",marginLeft:"5px"},children:[(0,n.jsx)("div",{style:{width:"55px",height:"30px",display:"flex",justifyContent:"start",alignItems:"center",textAlign:"center"},children:(0,n.jsxs)("b",{children:[e,":"]})}),l[e].keys.map(((t,a)=>(0,n.jsx)("button",{style:{width:"75px",height:"30px",border:"1px solid dimgray"},onContextMenu:t=>((e,t)=>{l[e].keys.splice(t,1),c(l),u(y+1)})(e,a),onClick:()=>((e,t)=>{h("Press new key..."),new Promise(((e,t)=>{document.addEventListener("keydown",(t=>e(t.key))),setTimeout((()=>{document.removeEventListener("keydown",(t=>e(t.key))),t("timeout")}),1e4)})).then((a=>{l[e].keys[t]=a,c(l),h("")})).catch((e=>{h(e)}))})(e,a),children:t},e))),(0,n.jsx)("div",{style:{display:"flex",flexDirection:"column"},children:l[e].keys.length<3&&(0,n.jsx)("button",{onClick:()=>(e=>{h("Press new key..."),new Promise(((e,t)=>{document.addEventListener("keydown",(t=>e(t.key))),setTimeout((()=>{document.removeEventListener("keydown",(t=>e(t.key))),t("timeout")}),1e4)})).then((t=>{l[e].keys[l[e].keys.length]=t,c(l),h("")})).catch((e=>{h(e)}))})(e),children:"+"})})]},e))),d]}),w={Confirm:()=>{i(l),a(!1),r(null)},Reset:()=>{c(o),u(y+1)},Cancel:()=>{c(o),a(!1),r(null)}};return(0,s.useEffect)((()=>{t&&r({title:"Keybinds",info:x,actions:w})}),[t,l,d,y]),(0,n.jsx)(n.Fragment,{})};function D(e){let{isSelected:t,action:a,setAction:i,appMenu:l,setAppMenu:c,appDialog:d,setAppDialog:h,contextMenu:y}=e;const u=(0,s.useRef)(),[x,w]=(0,s.useState)({up:{keys:["w","W","ArrowUp"],active:!0},down:{keys:["s","S","ArrowDown"],active:!0},left:{keys:["a","A","ArrowLeft"],active:!0},right:{keys:["d","D","ArrowRight"],active:!0},one:{keys:["1"],active:!1},two:{keys:["2"],active:!1},pause:{keys:["p","P","Pause"],active:!0}}),S=function(e,t){var[a,r]=(0,s.useState)({up:!1,down:!1,left:!1,right:!1,one:!1,two:!1,pause:!1});const o=(0,s.useCallback)(((e,a)=>{const s=Object.keys(t);for(let o=0;o<s.length;o++){let i=t[s[o]].keys;for(let t=0;t<i.length;t++)i[t]===e&&r((e=>({...e,[s[o]]:a})))}}),[t]),i=(0,s.useCallback)((e=>{o(e.key,!0)}),[o]),l=(0,s.useCallback)((e=>{o(e.key,!1)}),[o]);return(0,s.useEffect)((()=>(document.addEventListener("keydown",i),document.addEventListener("keyup",l),()=>{document.removeEventListener("keydown",i),document.removeEventListener("keyup",l)})),[i,l]),(0,s.useEffect)((()=>{e||r({...a,pause:!0})}),[e]),a}(t,x),[m,b]=(0,s.useState)("Start"),[g,k]=(0,s.useState)("None"),[v,P]=(0,s.useState)(!0),[j,M]=(0,s.useState)(!0),[C,E]=(0,s.useState)(!0),[T,O]=(0,s.useState)(!1),[R,D]=(0,s.useState)({time:0,score:0,gameState:"Start"}),L=e=>{D(e)},A=(e,t,a)=>{document.dispatchEvent(new KeyboardEvent(t,{key:x[e].keys[0],repeat:a}))},K=(e,t)=>{let a={};if(e.preventDefault(),"keypad"===t)a={Hide:{action:()=>{M(!1)}}};else if("scoreboard"===t)a={Hide:{action:()=>{E(!1)}}};else if("canvas"===t&&"None"!==g){let e="Play"===m?"Pause":"Play";a={"Play/Pause":{action:()=>{b(e)}},"New Game":{action:()=>{b("Restart")}}}}y.setOpen(),y.setPosition(e.clientX,e.clientY),y.setContent(a)};return(0,s.useEffect)((()=>{P("Play"!==m)}),[m]),(0,s.useEffect)((()=>{F(a,i,d,h,{gameState:m,setGameState:b,showControls:j,setShowControls:M,showScoreboard:C,setShowScoreboard:E,showKeybindDialog:T,setShowKeybindDialog:O})}),[a]),(0,s.useEffect)((()=>{N(l,c,{gameState:m,showControls:j,showScoreboard:C,gameChoice:g})}),[m,g,j,C]),(0,n.jsxs)("div",{id:"arcadeContainer",children:[(0,n.jsxs)("select",{id:"gameMenu",onChange:e=>{k(e.target.value),b("Start")},children:[(0,n.jsx)("option",{value:"None",children:"Select Game"}),(0,n.jsx)("option",{value:"Snake",children:"Snake"}),(0,n.jsx)("option",{value:"Breakout",children:"Breakout"}),(0,n.jsx)("option",{value:"Space Invaders",children:"Space Invaders"})]}),C&&(0,n.jsxs)("div",{id:"arcadeScoreboard",onContextMenu:e=>K(e,"scoreboard"),children:[(0,n.jsxs)("div",{id:"arcadeScore",children:["Time: ",R.time," seconds",(0,n.jsx)("br",{}),"Score: ",R.score,(0,n.jsx)("br",{})]}),(0,n.jsx)("div",{id:"arcadePlayButton",className:"arcadeButton",onClick:()=>{A("pause","keydown",!1),setTimeout((()=>A("pause","keyup",!1)),50)},children:v?(0,n.jsx)(o.i8P,{}):(0,n.jsx)(o.bb6,{})})]}),(0,n.jsx)("div",{id:"arcadeCanvasContainer",ref:u,onContextMenu:e=>K(e,"canvas"),children:"Snake"===g?(0,n.jsx)(p,{controls:S,updateScoreboard:L,isSelected:t,gameState:m,setGameState:b}):"Breakout"===g?(0,n.jsx)(f,{controls:S,updateScoreboard:L,isSelected:t,gameState:m,setGameState:b}):"Space Invaders"===g?(0,n.jsx)(B,{controls:S,updateScoreboard:L,isSelected:t,gameState:m,setGameState:b}):(0,n.jsx)(n.Fragment,{})}),j&&(0,n.jsxs)("div",{id:"arcadeControls",onContextMenu:e=>K(e,"keypad"),children:[(0,n.jsx)("div",{id:"arcadeLeftButton",className:S.left?"arcadeButton arcadeButtonOn":"arcadeButton",onMouseDown:()=>A("left","keydown",!0),onMouseUp:()=>A("left","keyup",!0),onTouchStart:()=>A("left","keyup",!0),onTouchEnd:()=>A("left","keyup",!0),children:(0,n.jsx)(r.QVr,{})}),(0,n.jsxs)("div",{id:"arcadeVerticalControls",children:[(0,n.jsx)("div",{id:"arcadeUpButton",className:S.up?"arcadeButton arcadeButtonOn":"arcadeButton",onMouseDown:()=>A("up","keydown",!0),onMouseUp:()=>A("up","keyup",!0),onTouchStart:()=>A("up","keyup",!0),onTouchEnd:()=>A("up","keyup",!0),children:(0,n.jsx)(r.uCC,{})}),(0,n.jsx)("div",{id:"arcadeDownButton",className:S.down?"arcadeButton arcadeButtonOn":"arcadeButton",onMouseDown:()=>A("down","keydown",!0),onMouseUp:()=>A("down","keyup",!0),onTouchStart:()=>A("down","keyup",!0),onTouchEnd:()=>A("down","keyup",!0),children:(0,n.jsx)(r.$TP,{})})]}),(0,n.jsx)("div",{id:"arcadeRightButton",className:S.right?"arcadeButton arcadeButtonOn":"arcadeButton",onMouseDown:()=>A("right","keydown",!0),onMouseUp:()=>A("right","keyup",!0),onTouchStart:()=>A("right","keyup",!0),onTouchEnd:()=>A("right","keyup",!0),children:(0,n.jsx)(r.Z0P,{})})]}),(0,n.jsx)(G,{showKeybindDialog:T,setShowKeybindDialog:O,setAppDialog:h,keyboard:x,setKeyboard:w})]})}}}]);
//# sourceMappingURL=255.aae20b77.chunk.js.map