(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aa744"],{"10a0":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:""}},[n("v-row",{attrs:{justify:"center"}},[n("v-col",{attrs:{"offset-md":"1",cols:"12",md:"10"}},[n("v-card",{attrs:{light:""}},[n("v-container",[n("v-row",{attrs:{justify:"center"}},t._l(t.scentNotes,(function(e,r){return n("v-col",{key:r,attrs:{cols:"12"}},[n("v-card",{attrs:{plain:"",outlined:""}},[n("v-card-title",[t._v(" "+t._s(e.name)+" ")]),n("v-card-text",[t._v(" "+t._s(e.description)+" ")]),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{to:{name:"noteDetails",params:{noteSlug:e.id}},plain:"",text:""}},[t._v("Xem thêm")])],1)],1)],1)})),1)],1)],1)],1)],1)],1)},a=[],c=n("1da1"),o=(n("96cf"),n("1a92")),s={data:function(){return{scentNotes:{}}},methods:{retrieveScentNote:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["a"].getAllScents().then((function(e){var n=e.data;t.scentNotes=n})).catch((function(t){console.log(t)}));case 2:case"end":return e.stop()}}),e)})))()}},created:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.retrieveScentNote();case 2:case"end":return e.stop()}}),e)})))()}},i=s,u=n("2877"),d=n("6544"),l=n.n(d),v=n("8336"),f=n("b0af"),p=n("99d9"),m=n("62ad"),w=n("a523"),h=n("0fd9"),V=n("2fa4"),g=Object(u["a"])(i,r,a,!1,null,null,null);e["default"]=g.exports;l()(g,{VBtn:v["a"],VCard:f["a"],VCardActions:p["a"],VCardText:p["c"],VCardTitle:p["d"],VCol:m["a"],VContainer:w["a"],VRow:h["a"],VSpacer:V["a"]})}}]);
//# sourceMappingURL=chunk-2d0aa744.2d550829.js.map