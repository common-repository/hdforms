!function(e){function t(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var r={};t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(1);r.n(o)},function(e,t){var r=wp.i18n.__,o=wp.blocks.registerBlockType,n=wp.components.SelectControl,l={backgroundColor:"#2d2d2d",color:"#fff",padding:"12px",textAlign:"center"},c=[],a=!1;jQuery.ajax({type:"POST",data:{action:"hdf_get_form_list"},url:ajaxurl,success:function(e){c=e,c=JSON.parse(c);var t={value:0,label:" -- "};c.unshift(t)}}),o("hdf/form-block",{title:r("HDForms"),icon:"image-flip-vertical",category:"common",keywords:[r("form"),r("hdform"),r("contact")],attributes:{formId:{type:"string",selector:".hdf-form-id"}},multiple:!1,reusable:!1,edit:function(e){function t(t){e.setAttributes({formId:t})}var r=e.attributes.formId;return!a&&e.isSelected&&(a=!0,setTimeout(function(){jQuery(".hdf_gutenberg_block").val(r)},500)),[wp.element.createElement("div",{style:l},"HDForms: This block will be replaced with the selected form",wp.element.createElement(n,{class:"hdf_gutenberg_block",onChange:t,value:e.attributes.formId,label:"Select a form",options:c}))]},save:function(e){return wp.element.createElement("div",{className:"hdf-forms-gutenberg"},"[hdf form = "+e.attributes.formId+"]")}})}]);