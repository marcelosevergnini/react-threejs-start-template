(this["webpackJsonpreact-threejs-start-template"]=this["webpackJsonpreact-threejs-start-template"]||[]).push([[0],{12:function(e,n,t){e.exports=t.p+"static/media/logo.5d5d9eef.svg"},16:function(e,n,t){e.exports=t(31)},22:function(e,n,t){},23:function(e,n,t){},29:function(e,n,t){},30:function(e,n,t){},31:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(11),s=t.n(o),i=(t(21),t(22),t(23),t(12)),c=t.n(i),l=t(13),d=t(14);var m=function(){return r.a.createElement("nav",{className:"navbar",role:"navigation","aria-label":"main navigation"},r.a.createElement("div",{className:"navbar-brand"},r.a.createElement("a",{className:"navbar-item",href:"arch-bricker"},r.a.createElement("img",{alt:"brand_logo",src:c.a}))),r.a.createElement("div",{id:"navbarBasicExample",className:"navbar-menu"},r.a.createElement("div",{className:"navbar-start"},r.a.createElement("a",{href:"/arch-bricker",className:"navbar-item"},"Home")),r.a.createElement("div",{className:"navbar-end"},r.a.createElement("div",{className:"navbar-item"},r.a.createElement("div",{className:"buttons"},r.a.createElement("a",{rel:"noopener noreferrer",className:"button",href:"https://github.com/marcelosevergnini/react-three-tests",target:"_blank"},r.a.createElement("span",{className:"icon"},r.a.createElement(l.a,{icon:d.a})),r.a.createElement("span",null,"GitHub")),r.a.createElement("button",{className:"button is-light is-outlined"},r.a.createElement("strong",null,"SignUp")),r.a.createElement("button",{className:"button is-light is-outlined"},r.a.createElement("strong",null,"Login")))))))};var u=function(){return r.a.createElement("section",{className:"hero is-dark is-small"},r.a.createElement(m,null),r.a.createElement("div",{className:"hero-body"},r.a.createElement("div",{className:"container"})))},h=t(3),f=t(5),v=t(4),p=t(6),b=t(2),g=t(15),E=t.n(g),w=function e(n,t){var a=this;Object(h.a)(this,e),this.scene=void 0,this.renderer=void 0,this.camera=void 0,this.controls=void 0,this.scroll=!0,this.setControls=function(){a.controls=new E.a(a.camera,a.renderer.domElement),a.controls.enableDamping=!0,a.controls.dampingFactor=1,a.controls.screenSpacePanning=!1,a.controls.minDistance=100,a.controls.maxDistance=7e3,a.controls.maxPolarAngle=Math.PI/2.3,a.controls.addEventListener("change",a.updateControls)},this.updateRenderSize=function(e,n,t){a.renderer.setSize(e,n,t),a.camera.aspect=e/n,a.camera.updateProjectionMatrix()},this.addLights=function(e){e.forEach((function(e){var n=new b.DirectionalLight(new b.Color(e.color));n.position.set(e.position.x,e.position.y,e.position.z).normalize(),a.scene.add(n)}))},this.addGrid=function(e){a.add(new b.GridHelper(e.size,e.dimensions,8290176,11514549))},this.add=function(e){a.scene.add(e)},this.updateControls=function(){a.renderer.render(a.scene,a.camera)},this.disableControls=function(){a.controls.enabled=!1,a.scroll=!1},this.enableControls=function(){a.controls.enabled=!0,a.scroll=!0},this.render=function(){a.renderer.render(a.scene,a.camera)},this.scene=new b.Scene,this.scene.background=new b.Color(t),this.renderer=new b.WebGLRenderer({antialias:n}),this.camera=new b.PerspectiveCamera(45,800/600,1,1e4),this.renderer.setSize(0,0,!1),this.camera.position.set(2e3,1500,1300),this.camera.lookAt(0,0,0)},N=(t(29),{height:"calc(75vh)"}),C=function(e){function n(e){var t;return Object(h.a)(this,n),(t=Object(f.a)(this,Object(v.a)(n).call(this,e))).containerRef=void 0,t.props=void 0,t.scene=void 0,t.componentDidMount=function(){t.containerRef.appendChild(t.scene.renderer.domElement);var e=t.containerRef,n=e.offsetWidth,a=e.offsetHeight;t.setState({width:n,height:a}),t.scene.updateRenderSize(n,a,!0),t.scene.addLights(t.props.lights),t.scene.addGrid(t.props.grid),t.scene.setControls(),window.addEventListener("resize",t.resizeCanvas,!0),window.addEventListener("mousemove",t.onDocumentMouseMove),t.containerRef.addEventListener("mouseover",t.scene.enableControls,!0),t.containerRef.addEventListener("mouseout",t.scene.disableControls,!0),t.animate()},t.animate=function(){window.requestAnimationFrame(t.animate),t.scene.controls.update(),t.scene.render()},t.resizeCanvas=function(){var e=t.containerRef,n=e.offsetWidth,a=e.offsetHeight;t.scene.updateRenderSize(n,a,!0),t.setState({width:n,height:a})},t.onDocumentMouseMove=function(e){e.preventDefault(),t.setState((function(){return{mousePos:{x:e.clientX/t.containerRef.offsetWidth*2-1,y:-e.clientY/t.containerRef.offsetHeight*2+1}}}))},t.render=function(){return r.a.createElement("div",{className:t.scene.scroll?"scrollEnable":"scrollDisable",style:N,ref:function(e){return t.containerRef=e}})},t.props=e,t.containerRef=r.a.createRef(),t.state={width:0,height:0,mousePos:{x:0,y:0}},t.scene=new w(!0,t.props.backgroundColor),t}return Object(p.a)(n,e),n}(a.Component);t(30);var R=function(){return r.a.createElement("div",{className:"container is-fluid content-spaces "},r.a.createElement("div",{className:"box box-color"},r.a.createElement(C,{backgroundColor:15921906,lights:[{color:16777215,position:{x:1,y:.75,z:.5}}],grid:{size:1e5,dimensions:500}})))};var k=function(){return r.a.createElement("div",{className:"footer is-dark is-small"},r.a.createElement("div",{className:"content has-text-centered"},r.a.createElement("p",null,r.a.createElement("strong",null,"Playground")," by ",r.a.createElement("a",{href:"https://github.com/marcelosevergnini"},"Marcelo Severgnini"),r.a.createElement("strong",null," Have Fun"))))};var x=function(){return r.a.createElement("div",null,r.a.createElement(u,null),r.a.createElement(R,null),r.a.createElement(k,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[16,1,2]]]);
//# sourceMappingURL=main.b7cf6bd5.chunk.js.map