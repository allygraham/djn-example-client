function ld_ready(e) {
  /in/.test(document.readyState) ? setTimeout("ld_ready(" + e + ")", 9) : e();
}

function getURLParameter(e) {
  return decodeURIComponent((new RegExp("[?|&]" + e + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [ , "" ])[1].replace(/\+/g, "%20")) || null;
}

function getCookie(e) {
  var t = document.cookie, n = t.indexOf(" " + e + "=");
  if (-1 == n && (n = t.indexOf(e + "=")), -1 == n) t = null; else {
      n = t.indexOf("=", n) + 1;
      var a = t.indexOf(";", n);
      -1 == a && (a = t.length), t = unescape(t.substring(n, a));
  }
  return t;
}

function setCookie(e, t, n) {
  var a = new Date();
  a.setDate(a.getDate() + n);
  var i = escape(t) + (null == n ? "" : "; expires=" + a.toUTCString());
  document.cookie = e + "=" + i;
}

function checkCookie(e) {
  var t = getCookie(e);
  return null != t && "" != t;
}

function fetchJSONFile(e, t) {
  try {
      var n = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      n.onreadystatechange = function() {
          if (4 === n.readyState) if (200 === n.status) {
              var e = JSON.parse(n.responseText);
              t && t(e);
          } else sendalert("JSON File (httpRequest status): " + n.status);
      }, n.open("GET", e), n.send();
  } catch (e) {
      sendalert("Error (fetchJSONFile function): " + e.message);
  }
}

function sendalert(e) {
  var t = "?" + ("url=" + encodeURIComponent(location.href)) + "&" + ("version=" + ld_version) + "&" + ("message=" + encodeURIComponent(e)), n = document.createElement("script");
  n.setAttribute("type", "text/javascript"), n.setAttribute("src", "http://adtrakld.co.uk/alert.php" + t);
  document.getElementsByTagName("script")[0].appendChild(n);
}

function replaceClassContent(e, t) {
  for (var n = getElementsByClassName(e), a = 0; a < n.length; a++) n[a].innerHTML = t;
}

function getUserVariable(e) {
  return void 0 !== ld_var[e] ? ld_var[e] : null;
}

function hideClass(e) {
  for (var t = getElementsByClassName(e), n = 0; n < t.length; n++) t[n].style.display = "none";
}

function addClass(e, t) {
  for (var n = getElementsByClassName(e), a = 0; a < n.length; a++) n[a].className = n[a].className + " " + t;
}

function addShowHideEvent(e) {
  addEvent(getElementsByClassName("ld-showhide", "a", e), "click", function(e) {
      for (var t = getElementsByClassName("ld-dropdown", "div", this.parentNode), n = 0; n < t.length; n++) "block" === t[n].style.display ? t[n].style.display = "none" : t[n].style.display = "block";
      var a = this.className.split(/\s+/), i = "ld-active", s = ~a.indexOf(i);
      a.splice(s ? a.indexOf(i) : 0, s ? 1 : 0, s ? null : i), this.className = a.join(" ").replace(/^\s+|\s+$/, "");
      var o = parseFloat(window.getComputedStyle(this, null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(this, null).getPropertyValue("padding-bottom")), r = parseFloat(window.getComputedStyle(this, null).getPropertyValue("height"));
      this.nextElementSibling.style.top = o + r + "px";
      var l = parseFloat(window.getComputedStyle(this, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(this, null).getPropertyValue("padding-right")), d = parseFloat(window.getComputedStyle(this, null).getPropertyValue("width")), c = parseFloat(window.getComputedStyle(this.nextElementSibling, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(this.nextElementSibling, null).getPropertyValue("padding-right"));
      l + d > c + parseFloat(window.getComputedStyle(this.nextElementSibling, null).getPropertyValue("width")) && (this.nextElementSibling.style.width = this.clientWidth - c + "px");
      var u = void 0 !== e ? e : event;
      u.preventDefault ? u.preventDefault() : u.returnValue = !1;
  });
}

jQuery(function(e) {
  !function() {
      e.fn.adtrakValidate = function() {
          function t(t) {
              elem = e(this), elem.data("old") !== elem.val() && (elem.data("old", elem.val()), 
              a(elem.parent(), n(elem)), e(s + ".submit").attr("disabled", i()));
          }
          function n(e) {
              if (type = e.data("validate"), "" === e.val()) return "";
              if ("text" === type) return "success";
              if ("letters" === type) {
                  if (allowed = /^[A-Z a-z]+$/, e.val().match(allowed)) return "success";
              } else if ("phone" === type) {
                  if (allowed = /^[0-9 +]+$/, e.val().match(allowed) && (value = e.val().replace(/[ +]/g, ""), 
                  value.length >= 11)) return "success";
              } else if ("date" === type) {
                  if (allowed = /^[0-9 / -]+$/, e.val().match(allowed) && (value = e.val().replace(/[ +]/g, ""), 
                  value.length >= 8)) return "success";
              } else if ("email" === type && (allowed = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
              allowed.test(e.val()))) return "success";
              return "issue";
          }
          function a(e, t) {
              e.removeClass("issue success").addClass(t), "" === t && (t = "default"), (e = e.find(".message")).html(e.data(t));
          }
          function i() {
              return check = !1, e(s + ".validate").each(function() {
                  e(this).parent().hasClass("success") || (check = !0);
              }), check;
          }
          var s = e(this).selector + " ";
          e(s + ".submit").attr("disabled", !0), e(s + ".validate").each(function() {
              elem = e(this), elem.data("old", elem.val()), elem.on("propertychange keyup input paste blur", t);
          });
      };
  }(jQuery);
}), jQuery(function(e) {
  jQuery.fn.preventDoubleSubmission = function() {
      return e(this).on("submit", function(t) {
          var n = e(this);
          !0 === n.data("submitted") ? t.preventDefault() : n.data("submitted", !0);
      }), this;
  };
}), jQuery(function(e) {
  e(document).ready(function() {
      e(".callback-form").adtrakValidate(), e(".contact-form").adtrakValidate(), e("form").preventDoubleSubmission(), 
      e('input[type="file"]').change(function() {
          if (e(this).val()) {
              var t = e(this).val().split(".").pop().toLowerCase(), n = this.files[0];
              e(this).parent().removeClass(), -1 == e.inArray(t, [ "gif", "png", "jpg", "jpeg" ]) ? (alert("Invalid file extension detected. Please only send .gif, .jpg & .png files"), 
              e(this).parent().addClass("issue")) : (n.size > 2097152 && (alert("File is too large. Maximum file size is 2MB."), 
              e(this).parent().addClass("issue")), e(this).parent().addClass("success"));
          }
      }), e(function() {
          e('form input[type="submit"]').click(function(t) {
              var n = e(this).parents("form").attr("name"), a = e(this).parents("form").attr("class").split(" ")[0], i = n.replace(/_/g, " ");
              e(this).next(".loading").show(), e("." + a + " input[type=submit]").attr("disabled", !0);
              var s = new FormData();
              s.append("form_name", i);
              var o = [ "submit_contact_form", "submit_callback_form" ], r = e(this).closest("form"), l = e(r).attr("name"), d = e(r).find("input"), c = e(r).find("input").not('[type="radio"]').not('[type="checkbox"]'), u = e(r).find("select"), p = e(r).find("textarea"), f = e(r).find('input[type="radio"]'), h = e(r).find('input[type="checkbox"]'), m = e(r).find('input[type="file"]');
              if (e(d).length > 0 && (e(c.add(u).add(p)).each(function(t) {
                  var n = e(this).attr("name"), a = e(this).val();
                  -1 == e.inArray(n, o) && s.append(n, a);
              }), e(f.is(":checked")).length > 0 && e(f).each(function(t) {
                  if (e(this).is(":checked")) {
                      var n = e(this).attr("name"), a = e(this).val();
                      s.append(n, a);
                  }
              }), e(h.is(":checked")).length > 0)) {
                  var v = new Array();
                  e(h).each(function() {
                      e(this).prop("checked") && (v.push(e(this).val()), s.append("Looking For", v));
                  });
              }
              e(m).each(function(t) {
                  s.append(e(this).attr("name"), e(this)[0].files[0]);
              });
              var g = e(this).next(".loading");
              e.ajax({
                  traditional: !0,
                  url: object_name.templateUrl + "/_includes/forms/mailer-ajax.php",
                  type: "POST",
                  data: s,
                  cache: !1,
                  contentType: !1,
                  processData: !1,
                  dataType: "json",
                  success: function(t) {
                      if ("error" == t.type) output = e(".results").addClass("visible issue"), output = e(".results").html("Something went wrong, please try again!"), 
                      output = e("." + a + " input[type=submit]").attr("disabled", !1), output = g.hide(); else {
                          output = e("." + a + " input[type=submit]").attr("disabled", !0), output = e("." + a + " input[type=submit]").attr("value", "Sent!"), 
                          output = e("body").append('<div class="results"></div>'), output = e(".results").html(t.text), 
                          output = e(".results").addClass("visible success");
                          try {
                              output = mouseflow.formSubmitSuccess(l);
                          } catch (e) {}
                          output = g.hide(), output = ga("send", "event", i, "Success", "Successful " + i + " Enquiry");
                      }
                  }
              }), t.preventDefault();
          });
      });
  });
}), jQuery(function(e) {
  !function(e) {
      e.cookie = function(t, n, a) {
          if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(n)) || null === n || void 0 === n)) {
              if (a = e.extend({}, a), null !== n && void 0 !== n || (a.expires = -1), "number" == typeof a.expires) {
                  var i = a.expires, s = a.expires = new Date();
                  s.setDate(s.getDate() + i);
              }
              return n = String(n), document.cookie = [ encodeURIComponent(t), "=", a.raw ? n : encodeURIComponent(n), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : "" ].join("");
          }
          for (var o, r = (a = n || {}).raw ? function(e) {
              return e;
          } : decodeURIComponent, l = document.cookie.split("; "), d = 0; o = l[d] && l[d].split("="); d++) if (r(o[0]) === t) return r(o[1] || "");
          return null;
      };
  }(jQuery), function() {
      e.fn.adtrakCookies = function(t) {
          var n = e.extend({
              notice: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
              link: "Learn more",
              url: "cookies-privacy-policy",
              time: 2
          }, t), a = "cookies", i = "adtrak_cookieaccept";
          return function() {
              return null === e.cookie(i) && (e.cookie(i, !0, {
                  expires: 365
              }), !0);
          }() && (e(this).append('<div class="' + a + '">' + n.notice + ' <a href="' + n.url + '" >' + n.link + "</a>.</div>"), 
          e("." + a).delay(1e3 * n.time).fadeOut(500).delay(500, function() {
              e(this).remove();
          })), {
              deleteCookie: function() {
                  e.cookie(i, !0, {
                      expires: -1
                  });
              }
          };
      };
  }(jQuery);
}), window.matchMedia || (window.matchMedia = function() {
  "use strict";
  var e = window.styleMedia || window.media;
  if (!e) {
      var t = document.createElement("style"), n = document.getElementsByTagName("script")[0], a = null;
      t.type = "text/css", t.id = "matchmediajs-test", n.parentNode.insertBefore(t, n), 
      a = "getComputedStyle" in window && window.getComputedStyle(t, null) || t.currentStyle, 
      e = {
          matchMedium: function(e) {
              var n = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
              return t.styleSheet ? t.styleSheet.cssText = n : t.textContent = n, "1px" === a.width;
          }
      };
  }
  return function(t) {
      return {
          matches: e.matchMedium(t || "all"),
          media: t || "all"
      };
  };
}()), function(e, t, n) {
  "use strict";
  function a(t) {
      "object" == typeof module && "object" == typeof module.exports ? module.exports = t : "function" == typeof define && define.amd && define("picturefill", function() {
          return t;
      }), "object" == typeof e && (e.picturefill = t);
  }
  function i(e) {
      for (var t, n, a, i, r, l = e || {}, d = 0, c = (t = l.elements || s.getAllElements()).length; c > d; d++) if (n = t[d], 
      a = n.parentNode, i = void 0, r = void 0, "IMG" === n.nodeName.toUpperCase() && (n[s.ns] || (n[s.ns] = {}), 
      l.reevaluate || !n[s.ns].evaluated)) {
          if (a && "PICTURE" === a.nodeName.toUpperCase()) {
              if (s.removeVideoShim(a), !1 === (i = s.getMatch(n, a))) continue;
          } else i = void 0;
          (a && "PICTURE" === a.nodeName.toUpperCase() || !s.sizesSupported && n.srcset && o.test(n.srcset)) && s.dodgeSrcset(n), 
          i ? (r = s.processSourceSet(i), s.applyBestCandidate(r, n)) : (r = s.processSourceSet(n), 
          (void 0 === n.srcset || n[s.ns].srcset) && s.applyBestCandidate(r, n)), n[s.ns].evaluated = !0;
      }
  }
  if (e.HTMLPictureElement) a(function() {}); else {
      t.createElement("picture");
      var s = e.picturefill || {}, o = /\s+\+?\d+(e\d+)?w/;
      s.ns = "picturefill", function() {
          s.srcsetSupported = "srcset" in n, s.sizesSupported = "sizes" in n, s.curSrcSupported = "currentSrc" in n;
      }(), s.trim = function(e) {
          return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
      }, s.makeUrl = function() {
          var e = t.createElement("a");
          return function(t) {
              return e.href = t, e.href;
          };
      }(), s.restrictsMixedContent = function() {
          return "https:" === e.location.protocol;
      }, s.matchesMedia = function(t) {
          return e.matchMedia && e.matchMedia(t).matches;
      }, s.getDpr = function() {
          return e.devicePixelRatio || 1;
      }, s.getWidthFromLength = function(e) {
          var n;
          if (!e || e.indexOf("%") > -1 != 0 || !(parseFloat(e) > 0 || e.indexOf("calc(") > -1)) return !1;
          e = e.replace("vw", "%"), s.lengthEl || (s.lengthEl = t.createElement("div"), s.lengthEl.style.cssText = "border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden", 
          s.lengthEl.className = "helper-from-picturefill-js"), s.lengthEl.style.width = "0px";
          try {
              s.lengthEl.style.width = e;
          } catch (e) {}
          return t.body.appendChild(s.lengthEl), 0 >= (n = s.lengthEl.offsetWidth) && (n = !1), 
          t.body.removeChild(s.lengthEl), n;
      }, s.detectTypeSupport = function(t, n) {
          var a = new e.Image();
          return a.onerror = function() {
              s.types[t] = !1, i();
          }, a.onload = function() {
              s.types[t] = 1 === a.width, i();
          }, a.src = n, "pending";
      }, s.types = s.types || {}, s.initTypeDetects = function() {
          s.types["image/jpeg"] = !0, s.types["image/gif"] = !0, s.types["image/png"] = !0, 
          s.types["image/svg+xml"] = t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), 
          s.types["image/webp"] = s.detectTypeSupport("image/webp", "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=");
      }, s.verifyTypeSupport = function(e) {
          var t = e.getAttribute("type");
          if (null === t || "" === t) return !0;
          var n = s.types[t];
          return "string" == typeof n && "pending" !== n ? (s.types[t] = s.detectTypeSupport(t, n), 
          "pending") : "function" == typeof n ? (n(), "pending") : n;
      }, s.parseSize = function(e) {
          var t = /(\([^)]+\))?\s*(.+)/g.exec(e);
          return {
              media: t && t[1],
              length: t && t[2]
          };
      }, s.findWidthFromSourceSize = function(n) {
          for (var a, i = s.trim(n).split(/\s*,\s*/), o = 0, r = i.length; r > o; o++) {
              var l = i[o], d = s.parseSize(l), c = d.length, u = d.media;
              if (c && (!u || s.matchesMedia(u)) && (a = s.getWidthFromLength(c))) break;
          }
          return a || Math.max(e.innerWidth || 0, t.documentElement.clientWidth);
      }, s.parseSrcset = function(e) {
          for (var t = []; "" !== e; ) {
              var n, a = (e = e.replace(/^\s+/g, "")).search(/\s/g), i = null;
              if (-1 !== a) {
                  if (("," === (n = e.slice(0, a)).slice(-1) || "" === n) && (n = n.replace(/,+$/, ""), 
                  i = ""), e = e.slice(a + 1), null === i) {
                      var s = e.indexOf(",");
                      -1 !== s ? (i = e.slice(0, s), e = e.slice(s + 1)) : (i = e, e = "");
                  }
              } else n = e, e = "";
              (n || i) && t.push({
                  url: n,
                  descriptor: i
              });
          }
          return t;
      }, s.parseDescriptor = function(e, t) {
          var n, a = t || "100vw", i = e && e.replace(/(^\s+|\s+$)/g, ""), o = s.findWidthFromSourceSize(a);
          if (i) for (var r = i.split(" "), l = r.length - 1; l >= 0; l--) {
              var d = r[l], c = d && d.slice(d.length - 1);
              if ("h" !== c && "w" !== c || s.sizesSupported) {
                  if ("x" === c) {
                      var u = d && parseFloat(d, 10);
                      n = u && !isNaN(u) ? u : 1;
                  }
              } else n = parseFloat(parseInt(d, 10) / o);
          }
          return n || 1;
      }, s.getCandidatesFromSourceSet = function(e, t) {
          for (var n = s.parseSrcset(e), a = [], i = 0, o = n.length; o > i; i++) {
              var r = n[i];
              a.push({
                  url: r.url,
                  resolution: s.parseDescriptor(r.descriptor, t)
              });
          }
          return a;
      }, s.dodgeSrcset = function(e) {
          e.srcset && (e[s.ns].srcset = e.srcset, e.srcset = "", e.setAttribute("data-pfsrcset", e[s.ns].srcset));
      }, s.processSourceSet = function(e) {
          var t = e.getAttribute("srcset"), n = e.getAttribute("sizes"), a = [];
          return "IMG" === e.nodeName.toUpperCase() && e[s.ns] && e[s.ns].srcset && (t = e[s.ns].srcset), 
          t && (a = s.getCandidatesFromSourceSet(t, n)), a;
      }, s.backfaceVisibilityFix = function(e) {
          var t = e.style || {}, n = "webkitBackfaceVisibility" in t, a = t.zoom;
          n && (t.zoom = ".999", n = e.offsetWidth, t.zoom = a);
      }, s.setIntrinsicSize = function() {
          var n = {}, a = function(e, t, n) {
              t && e.setAttribute("width", parseInt(t / n, 10));
          };
          return function(i, o) {
              var r;
              i[s.ns] && !e.pfStopIntrinsicSize && (void 0 === i[s.ns].dims && (i[s.ns].dims = i.getAttribute("width") || i.getAttribute("height")), 
              i[s.ns].dims || (o.url in n ? a(i, n[o.url], o.resolution) : (r = t.createElement("img"), 
              r.onload = function() {
                  if (n[o.url] = r.width, !n[o.url]) try {
                      t.body.appendChild(r), n[o.url] = r.width || r.offsetWidth, t.body.removeChild(r);
                  } catch (e) {}
                  i.src === o.url && a(i, n[o.url], o.resolution), i = null, r.onload = null, r = null;
              }, r.src = o.url)));
          };
      }(), s.applyBestCandidate = function(e, t) {
          var n, a, i;
          e.sort(s.ascendingSort), i = e[(a = e.length) - 1];
          for (var o = 0; a > o; o++) if ((n = e[o]).resolution >= s.getDpr()) {
              i = n;
              break;
          }
          i && (i.url = s.makeUrl(i.url), t.src !== i.url && (s.restrictsMixedContent() && "http:" === i.url.substr(0, "http:".length).toLowerCase() ? void 0 !== window.console && console.warn("Blocked mixed content image " + i.url) : (t.src = i.url, 
          s.curSrcSupported || (t.currentSrc = t.src), s.backfaceVisibilityFix(t))), s.setIntrinsicSize(t, i));
      }, s.ascendingSort = function(e, t) {
          return e.resolution - t.resolution;
      }, s.removeVideoShim = function(e) {
          var t = e.getElementsByTagName("video");
          if (t.length) {
              for (var n = t[0], a = n.getElementsByTagName("source"); a.length; ) e.insertBefore(a[0], n);
              n.parentNode.removeChild(n);
          }
      }, s.getAllElements = function() {
          for (var e = [], n = t.getElementsByTagName("img"), a = 0, i = n.length; i > a; a++) {
              var o = n[a];
              ("PICTURE" === o.parentNode.nodeName.toUpperCase() || null !== o.getAttribute("srcset") || o[s.ns] && null !== o[s.ns].srcset) && e.push(o);
          }
          return e;
      }, s.getMatch = function(e, t) {
          for (var n, a = t.childNodes, i = 0, o = a.length; o > i; i++) {
              var r = a[i];
              if (1 === r.nodeType) {
                  if (r === e) return n;
                  if ("SOURCE" === r.nodeName.toUpperCase()) {
                      null !== r.getAttribute("src") && void 0 !== typeof console && console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");
                      var l = r.getAttribute("media");
                      if (r.getAttribute("srcset") && (!l || s.matchesMedia(l))) {
                          var d = s.verifyTypeSupport(r);
                          if (!0 === d) {
                              n = r;
                              break;
                          }
                          if ("pending" === d) return !1;
                      }
                  }
              }
          }
          return n;
      }, function() {
          function n() {
              clearTimeout(a), a = setTimeout(r, 60);
          }
          s.initTypeDetects(), i();
          var a, o = setInterval(function() {
              return i(), /^loaded|^i|^c/.test(t.readyState) ? void clearInterval(o) : void 0;
          }, 250), r = function() {
              i({
                  reevaluate: !0
              });
          };
          e.addEventListener ? e.addEventListener("resize", n, !1) : e.attachEvent && e.attachEvent("onresize", n);
      }(), i._ = s, a(i);
  }
}(window, window.document, new window.Image()), function(e) {
  function t() {
      e[n].glbl || (o = {
          $wndw: e(window),
          $html: e("html"),
          $body: e("body")
      }, a = {}, i = {}, s = {}, e.each([ a, i, s ], function(e, t) {
          t.add = function(e) {
              for (var n = 0, a = (e = e.split(" ")).length; a > n; n++) t[e[n]] = t.mm(e[n]);
          };
      }), a.mm = function(e) {
          return "mm-" + e;
      }, a.add("wrapper menu panel nopanel current highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen"), 
      a.umm = function(e) {
          return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e;
      }, i.mm = function(e) {
          return "mm-" + e;
      }, i.add("parent sub"), s.mm = function(e) {
          return e + ".mm";
      }, s.add("transitionend webkitTransitionEnd mousedown mouseup touchstart touchmove touchend click keydown"), 
      e[n]._c = a, e[n]._d = i, e[n]._e = s, e[n].glbl = o);
  }
  var n = "mmenu";
  if (!e[n]) {
      e[n] = function(e, t, n) {
          this.$menu = e, this._api = [ "bind", "init", "update", "setSelected", "getInstance", "openPanel", "closePanel", "closeAllPanels" ], 
          this.opts = t, this.conf = n, this.vars = {}, this.cbck = {}, "function" == typeof this.___deprecated && this.___deprecated(), 
          this._initMenu(), this._initAnchors();
          var a = this.$menu.children(this.conf.panelNodetype);
          return this._initAddons(), this.init(a), "function" == typeof this.___debug && this.___debug(), 
          this;
      }, e[n].version = "5.3.3", e[n].addons = {}, e[n].uniqueId = 0, e[n].defaults = {
          extensions: [],
          navbar: {
              add: !0,
              title: "Menu",
              titleLink: "panel"
          },
          onClick: {
              setSelected: !0
          },
          slidingSubmenus: !0
      }, e[n].configuration = {
          classNames: {
              divider: "Divider",
              inset: "Inset",
              panel: "Panel",
              selected: "Selected",
              spacer: "Spacer",
              vertical: "Vertical"
          },
          clone: !1,
          openingInterval: 25,
          panelNodetype: "ul, ol, div",
          transitionDuration: 400
      }, e[n].prototype = {
          init: function(e) {
              e = e.not("." + a.nopanel), e = this._initPanels(e), this.trigger("init", e), this.trigger("update");
          },
          update: function() {
              this.trigger("update");
          },
          setSelected: function(e) {
              this.$menu.find("." + a.listview).children().removeClass(a.selected), e.addClass(a.selected), 
              this.trigger("setSelected", e);
          },
          openPanel: function(e) {
              var t = e.parent();
              if (t.hasClass(a.vertical)) {
                  var n = t.parents("." + a.subopened);
                  if (n.length) return this.openPanel(n.first());
                  t.addClass(a.opened);
              } else {
                  if (e.hasClass(a.current)) return;
                  var i = this.$menu.children("." + a.panel), s = i.filter("." + a.current);
                  i.removeClass(a.highest).removeClass(a.current).not(e).not(s).not("." + a.vertical).addClass(a.hidden), 
                  e.hasClass(a.opened) ? e.nextAll("." + a.opened).addClass(a.highest).removeClass(a.opened).removeClass(a.subopened) : (e.addClass(a.highest), 
                  s.addClass(a.subopened)), e.removeClass(a.hidden).addClass(a.current), setTimeout(function() {
                      e.removeClass(a.subopened).addClass(a.opened);
                  }, this.conf.openingInterval);
              }
              this.trigger("openPanel", e);
          },
          closePanel: function(e) {
              var t = e.parent();
              t.hasClass(a.vertical) && (t.removeClass(a.opened), this.trigger("closePanel", e));
          },
          closeAllPanels: function() {
              this.$menu.find("." + a.listview).children().removeClass(a.selected).filter("." + a.vertical).removeClass(a.opened);
              var e = this.$menu.children("." + a.panel).first();
              this.$menu.children("." + a.panel).not(e).removeClass(a.subopened).removeClass(a.opened).removeClass(a.current).removeClass(a.highest).addClass(a.hidden), 
              this.openPanel(e);
          },
          togglePanel: function(e) {
              var t = e.parent();
              t.hasClass(a.vertical) && this[t.hasClass(a.opened) ? "closePanel" : "openPanel"](e);
          },
          getInstance: function() {
              return this;
          },
          bind: function(e, t) {
              this.cbck[e] = this.cbck[e] || [], this.cbck[e].push(t);
          },
          trigger: function() {
              var e = this, t = Array.prototype.slice.call(arguments), n = t.shift();
              if (this.cbck[n]) for (var a = 0, i = this.cbck[n].length; i > a; a++) this.cbck[n][a].apply(e, t);
          },
          _initMenu: function() {
              this.opts.offCanvas && this.conf.clone && (this.$menu = this.$menu.clone(!0), this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function() {
                  e(this).attr("id", a.mm(e(this).attr("id")));
              })), this.$menu.contents().each(function() {
                  3 == e(this)[0].nodeType && e(this).remove();
              }), this.$menu.parent().addClass(a.wrapper);
              var t = [ a.menu ];
              this.opts.slidingSubmenus || t.push(a.vertical), this.opts.extensions = this.opts.extensions.length ? "mm-" + this.opts.extensions.join(" mm-") : "", 
              this.opts.extensions && t.push(this.opts.extensions), this.$menu.addClass(t.join(" "));
          },
          _initPanels: function(t) {
              var n = this, s = this.__findAddBack(t, "ul, ol");
              this.__refactorClass(s, this.conf.classNames.inset, "inset").addClass(a.nolistview + " " + a.nopanel), 
              s.not("." + a.nolistview).addClass(a.listview);
              var o = this.__findAddBack(t, "." + a.listview).children();
              this.__refactorClass(o, this.conf.classNames.selected, "selected"), this.__refactorClass(o, this.conf.classNames.divider, "divider"), 
              this.__refactorClass(o, this.conf.classNames.spacer, "spacer"), this.__refactorClass(this.__findAddBack(t, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel");
              var r = e(), l = t.add(t.find("." + a.panel)).add(this.__findAddBack(t, "." + a.listview).children().children(this.conf.panelNodetype)).not("." + a.nopanel);
              this.__refactorClass(l, this.conf.classNames.vertical, "vertical"), this.opts.slidingSubmenus || l.addClass(a.vertical), 
              l.each(function() {
                  var t = e(this), i = t;
                  t.is("ul, ol") ? (t.wrap('<div class="' + a.panel + '" />'), i = t.parent()) : i.addClass(a.panel);
                  var s = t.attr("id");
                  t.removeAttr("id"), i.attr("id", s || n.__getUniqueId()), t.hasClass(a.vertical) && (t.removeClass(n.conf.classNames.vertical), 
                  i.add(i.parent()).addClass(a.vertical)), r = r.add(i);
              });
              var d = e("." + a.panel, this.$menu);
              r.each(function() {
                  var t = e(this), s = (l = t.parent()).children("a, span").first();
                  if (l.is("." + a.menu) || (l.data(i.sub, t), t.data(i.parent, l)), !l.children("." + a.next).length && l.parent().is("." + a.listview)) {
                      var o = t.attr("id"), r = e('<a class="' + a.next + '" href="#' + o + '" data-target="#' + o + '" />').insertBefore(s);
                      s.is("span") && r.addClass(a.fullsubopen);
                  }
                  if (!t.children("." + a.navbar).length && !l.hasClass(a.vertical)) {
                      if (l.parent().is("." + a.listview)) l = l.closest("." + a.panel); else var s = l.closest("." + a.panel).find('a[href="#' + t.attr("id") + '"]').first(), l = s.closest("." + a.panel);
                      var d = e('<div class="' + a.navbar + '" />');
                      if (l.length) {
                          o = l.attr("id");
                          switch (n.opts.navbar.titleLink) {
                            case "anchor":
                              _url = s.attr("href");
                              break;

                            case "panel":
                            case "parent":
                              _url = "#" + o;
                              break;

                            case "none":
                            default:
                              _url = !1;
                          }
                          d.append('<a class="' + a.btn + " " + a.prev + '" href="#' + o + '" data-target="#' + o + '"></a>').append('<a class="' + a.title + '"' + (_url ? ' href="' + _url + '"' : "") + ">" + s.text() + "</a>").prependTo(t), 
                          n.opts.navbar.add && t.addClass(a.hasnavbar);
                      } else n.opts.navbar.title && (d.append('<a class="' + a.title + '">' + n.opts.navbar.title + "</a>").prependTo(t), 
                      n.opts.navbar.add && t.addClass(a.hasnavbar));
                  }
              });
              var c = this.__findAddBack(t, "." + a.listview).children("." + a.selected).removeClass(a.selected).last().addClass(a.selected);
              c.add(c.parentsUntil("." + a.menu, "li")).filter("." + a.vertical).addClass(a.opened).end().not("." + a.vertical).each(function() {
                  e(this).parentsUntil("." + a.menu, "." + a.panel).not("." + a.vertical).first().addClass(a.opened).parentsUntil("." + a.menu, "." + a.panel).not("." + a.vertical).first().addClass(a.opened).addClass(a.subopened);
              }), c.children("." + a.panel).not("." + a.vertical).addClass(a.opened).parentsUntil("." + a.menu, "." + a.panel).not("." + a.vertical).first().addClass(a.opened).addClass(a.subopened);
              var u = d.filter("." + a.opened);
              return u.length || (u = r.first()), u.addClass(a.opened).last().addClass(a.current), 
              r.not("." + a.vertical).not(u.last()).addClass(a.hidden).end().appendTo(this.$menu), 
              r;
          },
          _initAnchors: function() {
              var t = this;
              o.$body.on(s.click + "-oncanvas", "a[href]", function(i) {
                  var s = e(this), r = !1, l = t.$menu.find(s).length;
                  for (var d in e[n].addons) if (r = e[n].addons[d].clickAnchor.call(t, s, l)) break;
                  if (!r && l) {
                      var c = s.attr("href");
                      if (c.length > 1 && "#" == c.slice(0, 1)) try {
                          var u = e(c, t.$menu);
                          u.is("." + a.panel) && (r = !0, t[s.parent().hasClass(a.vertical) ? "togglePanel" : "openPanel"](u));
                      } catch (e) {}
                  }
                  if (r && i.preventDefault(), !r && l && s.is("." + a.listview + " > li > a") && !s.is('[rel="external"]') && !s.is('[target="_blank"]')) {
                      t.__valueOrFn(t.opts.onClick.setSelected, s) && t.setSelected(e(i.target).parent());
                      var p = t.__valueOrFn(t.opts.onClick.preventDefault, s, "#" == c.slice(0, 1));
                      p && i.preventDefault(), t.__valueOrFn(t.opts.onClick.blockUI, s, !p) && o.$html.addClass(a.blocking), 
                      t.__valueOrFn(t.opts.onClick.close, s, p) && t.close();
                  }
              });
          },
          _initAddons: function() {
              for (var t in e[n].addons) e[n].addons[t].add.call(this), e[n].addons[t].add = function() {};
              for (var t in e[n].addons) e[n].addons[t].setup.call(this);
          },
          __api: function() {
              var t = this, n = {};
              return e.each(this._api, function() {
                  var e = this;
                  n[e] = function() {
                      var a = t[e].apply(t, arguments);
                      return void 0 === a ? n : a;
                  };
              }), n;
          },
          __valueOrFn: function(e, t, n) {
              return "function" == typeof e ? e.call(t[0]) : void 0 === e && void 0 !== n ? n : e;
          },
          __refactorClass: function(e, t, n) {
              return e.filter("." + t).removeClass(t).addClass(a[n]);
          },
          __findAddBack: function(e, t) {
              return e.find(t).add(e.filter(t));
          },
          __filterListItems: function(e) {
              return e.not("." + a.divider).not("." + a.hidden);
          },
          __transitionend: function(e, t, n) {
              var a = !1, i = function() {
                  a || t.call(e[0]), a = !0;
              };
              e.one(s.transitionend, i), e.one(s.webkitTransitionEnd, i), setTimeout(i, 1.1 * n);
          },
          __getUniqueId: function() {
              return a.mm(e[n].uniqueId++);
          }
      }, e.fn[n] = function(a, i) {
          return t(), a = e.extend(!0, {}, e[n].defaults, a), i = e.extend(!0, {}, e[n].configuration, i), 
          this.each(function() {
              var t = e(this);
              if (!t.data(n)) {
                  var s = new e[n](t, a, i);
                  t.data(n, s.__api());
              }
          });
      }, e[n].support = {
          touch: "ontouchstart" in window || navigator.msMaxTouchPoints
      };
      var a, i, s, o;
  }
}(jQuery), function(e) {
  var t = "mmenu", n = "offCanvas";
  e[t].addons[n] = {
      setup: function() {
          if (this.opts[n]) {
              var i = this.opts[n], s = this.conf[n];
              o = e[t].glbl, this._api = e.merge(this._api, [ "open", "close", "setPage" ]), ("top" == i.position || "bottom" == i.position) && (i.zposition = "front"), 
              "string" != typeof s.pageSelector && (s.pageSelector = "> " + s.pageNodetype), o.$allMenus = (o.$allMenus || e()).add(this.$menu), 
              this.vars.opened = !1;
              var r = [ a.offcanvas ];
              "left" != i.position && r.push(a.mm(i.position)), "back" != i.zposition && r.push(a.mm(i.zposition)), 
              this.$menu.addClass(r.join(" ")).parent().removeClass(a.wrapper), this.setPage(o.$page), 
              this._initBlocker(), this["_initWindow_" + n](), this.$menu[s.menuInjectMethod + "To"](s.menuWrapperSelector);
          }
      },
      add: function() {
          a = e[t]._c, i = e[t]._d, s = e[t]._e, a.add("offcanvas slideout modal background opening blocker page"), 
          i.add("style"), s.add("resize");
      },
      clickAnchor: function(e) {
          if (!this.opts[n]) return !1;
          var t = this.$menu.attr("id");
          return t && t.length && (this.conf.clone && (t = a.umm(t)), e.is('[href="#' + t + '"]')) ? (this.open(), 
          !0) : o.$page ? !!((t = o.$page.first().attr("id")) && t.length && e.is('[href="#' + t + '"]')) && (this.close(), 
          !0) : void 0;
      }
  }, e[t].defaults[n] = {
      position: "left",
      zposition: "back",
      modal: !1,
      moveBackground: !0
  }, e[t].configuration[n] = {
      pageNodetype: "div",
      pageSelector: null,
      wrapPageIfNeeded: !0,
      menuWrapperSelector: "body",
      menuInjectMethod: "prepend"
  }, e[t].prototype.open = function() {
      if (!this.vars.opened) {
          var e = this;
          this._openSetup(), setTimeout(function() {
              e._openFinish();
          }, this.conf.openingInterval), this.trigger("open");
      }
  }, e[t].prototype._openSetup = function() {
      var t = this;
      this.closeAllOthers(), o.$page.each(function() {
          e(this).data(i.style, e(this).attr("style") || "");
      }), o.$wndw.trigger(s.resize + "-offcanvas", [ !0 ]);
      var r = [ a.opened ];
      this.opts[n].modal && r.push(a.modal), this.opts[n].moveBackground && r.push(a.background), 
      "left" != this.opts[n].position && r.push(a.mm(this.opts[n].position)), "back" != this.opts[n].zposition && r.push(a.mm(this.opts[n].zposition)), 
      this.opts.extensions && r.push(this.opts.extensions), o.$html.addClass(r.join(" ")), 
      setTimeout(function() {
          t.vars.opened = !0;
      }, this.conf.openingInterval), this.$menu.addClass(a.current + " " + a.opened);
  }, e[t].prototype._openFinish = function() {
      var e = this;
      this.__transitionend(o.$page.first(), function() {
          e.trigger("opened");
      }, this.conf.transitionDuration), o.$html.addClass(a.opening), this.trigger("opening");
  }, e[t].prototype.close = function() {
      if (this.vars.opened) {
          var t = this;
          this.__transitionend(o.$page.first(), function() {
              t.$menu.removeClass(a.current).removeClass(a.opened), o.$html.removeClass(a.opened).removeClass(a.modal).removeClass(a.background).removeClass(a.mm(t.opts[n].position)).removeClass(a.mm(t.opts[n].zposition)), 
              t.opts.extensions && o.$html.removeClass(t.opts.extensions), o.$page.each(function() {
                  e(this).attr("style", e(this).data(i.style));
              }), t.vars.opened = !1, t.trigger("closed");
          }, this.conf.transitionDuration), o.$html.removeClass(a.opening), this.trigger("close"), 
          this.trigger("closing");
      }
  }, e[t].prototype.closeAllOthers = function() {
      o.$allMenus.not(this.$menu).each(function() {
          var n = e(this).data(t);
          n && n.close && n.close();
      });
  }, e[t].prototype.setPage = function(t) {
      var i = this, s = this.conf[n];
      t && t.length || (t = o.$body.find(s.pageSelector)).length > 1 && s.wrapPageIfNeeded && (t = t.wrapAll("<" + this.conf[n].pageNodetype + " />").parent()), 
      t.each(function() {
          e(this).attr("id", e(this).attr("id") || i.__getUniqueId());
      }), t.addClass(a.page + " " + a.slideout), o.$page = t, this.trigger("setPage", t);
  }, e[t].prototype["_initWindow_" + n] = function() {
      o.$wndw.off(s.keydown + "-offcanvas").on(s.keydown + "-offcanvas", function(e) {
          return o.$html.hasClass(a.opened) && 9 == e.keyCode ? (e.preventDefault(), !1) : void 0;
      });
      var e = 0;
      o.$wndw.off(s.resize + "-offcanvas").on(s.resize + "-offcanvas", function(t, n) {
          if (1 == o.$page.length && (n || o.$html.hasClass(a.opened))) {
              var i = o.$wndw.height();
              (n || i != e) && (e = i, o.$page.css("minHeight", i));
          }
      });
  }, e[t].prototype._initBlocker = function() {
      var t = this;
      o.$blck || (o.$blck = e('<div id="' + a.blocker + '" class="' + a.slideout + '" />')), 
      o.$blck.appendTo(o.$body).off(s.touchstart + "-offcanvas " + s.touchmove + "-offcanvas").on(s.touchstart + "-offcanvas " + s.touchmove + "-offcanvas", function(e) {
          e.preventDefault(), e.stopPropagation(), o.$blck.trigger(s.mousedown + "-offcanvas");
      }).off(s.mousedown + "-offcanvas").on(s.mousedown + "-offcanvas", function(e) {
          e.preventDefault(), o.$html.hasClass(a.modal) || (t.closeAllOthers(), t.close());
      });
  };
  var a, i, s, o;
}(jQuery), function(e) {
  var t = "mmenu", n = "autoHeight";
  e[t].addons[n] = {
      setup: function() {
          if (this.opts.offCanvas) {
              switch (this.opts.offCanvas.position) {
                case "left":
                case "right":
                  return;
              }
              var i = this, r = this.opts[n];
              if (this.conf[n], o = e[t].glbl, "boolean" == typeof r && r && (r = {
                  height: "auto"
              }), "object" != typeof r && (r = {}), "auto" == (r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r)).height) {
                  this.$menu.addClass(a.autoheight);
                  var l = function(e) {
                      var t = this.$menu.children("." + a.current);
                      _top = parseInt(t.css("top"), 10) || 0, _bot = parseInt(t.css("bottom"), 10) || 0, 
                      this.$menu.addClass(a.measureheight), (e = e || this.$menu.children("." + a.current)).is("." + a.vertical) && (e = e.parents("." + a.panel).not("." + a.vertical).first()), 
                      this.$menu.height(e.outerHeight() + _top + _bot).removeClass(a.measureheight);
                  };
                  this.bind("update", l), this.bind("openPanel", l), this.bind("closePanel", l), this.bind("open", l), 
                  o.$wndw.off(s.resize + "-autoheight").on(s.resize + "-autoheight", function() {
                      l.call(i);
                  });
              }
          }
      },
      add: function() {
          a = e[t]._c, i = e[t]._d, s = e[t]._e, a.add("autoheight measureheight"), s.add("resize");
      },
      clickAnchor: function() {}
  }, e[t].defaults[n] = {
      height: "default"
  };
  var a, i, s, o;
}(jQuery), function(e) {
  var t = "mmenu", n = "backButton";
  e[t].addons[n] = {
      setup: function() {
          if (this.opts.offCanvas) {
              var i = this, s = this.opts[n];
              if (this.conf[n], o = e[t].glbl, "boolean" == typeof s && (s = {
                  close: s
              }), "object" != typeof s && (s = {}), (s = e.extend(!0, {}, e[t].defaults[n], s)).close) {
                  var r = "#" + i.$menu.attr("id");
                  this.bind("opened", function() {
                      location.hash != r && history.pushState(null, document.title, r);
                  }), e(window).on("popstate", function(e) {
                      o.$html.hasClass(a.opened) ? (e.stopPropagation(), i.close()) : location.hash == r && (e.stopPropagation(), 
                      i.open());
                  });
              }
          }
      },
      add: function() {
          return window.history && window.history.pushState ? (a = e[t]._c, i = e[t]._d, void (s = e[t]._e)) : void (e[t].addons[n].setup = function() {});
      },
      clickAnchor: function() {}
  }, e[t].defaults[n] = {
      close: !1
  };
  var a, i, s, o;
}(jQuery), function(e) {
  var t = "mmenu", n = "counters";
  e[t].addons[n] = {
      setup: function() {
          var s = this, r = this.opts[n];
          this.conf[n], o = e[t].glbl, "boolean" == typeof r && (r = {
              add: r,
              update: r
          }), "object" != typeof r && (r = {}), r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r), 
          this.bind("init", function(t) {
              this.__refactorClass(e("em", t), this.conf.classNames[n].counter, "counter");
          }), r.add && this.bind("init", function(t) {
              t.each(function() {
                  var t = e(this).data(i.parent);
                  t && (t.children("em." + a.counter).length || t.prepend(e('<em class="' + a.counter + '" />')));
              });
          }), r.update && this.bind("update", function() {
              this.$menu.find("." + a.panel).each(function() {
                  var t = e(this), n = t.data(i.parent);
                  if (n) {
                      var o = n.children("em." + a.counter);
                      o.length && (t = t.children("." + a.listview)).length && o.html(s.__filterListItems(t.children()).length);
                  }
              });
          });
      },
      add: function() {
          a = e[t]._c, i = e[t]._d, s = e[t]._e, a.add("counter search noresultsmsg");
      },
      clickAnchor: function() {}
  }, e[t].defaults[n] = {
      add: !1,
      update: !1
  }, e[t].configuration.classNames[n] = {
      counter: "Counter"
  };
  var a, i, s, o;
}(jQuery), function(e) {
  var t = "mmenu", n = "dividers";
  e[t].addons[n] = {
      setup: function() {
          var i = this, r = this.opts[n];
          if (this.conf[n], o = e[t].glbl, "boolean" == typeof r && (r = {
              add: r,
              fixed: r
          }), "object" != typeof r && (r = {}), r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r), 
          this.bind("init", function() {
              this.__refactorClass(e("li", this.$menu), this.conf.classNames[n].collapsed, "collapsed");
          }), r.add && this.bind("init", function(t) {
              switch (r.addTo) {
                case "panels":
                  n = t;
                  break;

                default:
                  var n = e(r.addTo, this.$menu).filter("." + a.panel);
              }
              e("." + a.divider, n).remove(), n.find("." + a.listview).not("." + a.vertical).each(function() {
                  var t = "";
                  i.__filterListItems(e(this).children()).each(function() {
                      var n = e.trim(e(this).children("a, span").text()).slice(0, 1).toLowerCase();
                      n != t && n.length && (t = n, e('<li class="' + a.divider + '">' + n + "</li>").insertBefore(this));
                  });
              });
          }), r.collapse && this.bind("init", function(t) {
              e("." + a.divider, t).each(function() {
                  var t = e(this);
                  t.nextUntil("." + a.divider, "." + a.collapsed).length && (t.children("." + a.subopen).length || (t.wrapInner("<span />"), 
                  t.prepend('<a href="#" class="' + a.subopen + " " + a.fullsubopen + '" />')));
              });
          }), r.fixed) {
              var l = function(t) {
                  if ((t = t || this.$menu.children("." + a.current)).find("." + a.divider).not("." + a.hidden).length) {
                      this.$menu.addClass(a.hasdividers);
                      var n = t.scrollTop() || 0, i = "";
                      t.is(":visible") && t.find("." + a.divider).not("." + a.hidden).each(function() {
                          e(this).position().top + n < n + 1 && (i = e(this).text());
                      }), this.$fixeddivider.text(i);
                  } else this.$menu.removeClass(a.hasdividers);
              };
              this.$fixeddivider = e('<ul class="' + a.listview + " " + a.fixeddivider + '"><li class="' + a.divider + '"></li></ul>').prependTo(this.$menu).children(), 
              this.bind("openPanel", l), this.bind("init", function(t) {
                  t.off(s.scroll + "-dividers " + s.touchmove + "-dividers").on(s.scroll + "-dividers " + s.touchmove + "-dividers", function() {
                      l.call(i, e(this));
                  });
              });
          }
      },
      add: function() {
          a = e[t]._c, i = e[t]._d, s = e[t]._e, a.add("collapsed uncollapsed fixeddivider hasdividers"), 
          s.add("scroll");
      },
      clickAnchor: function(e, t) {
          if (this.opts[n].collapse && t) {
              var i = e.parent();
              if (i.is("." + a.divider)) {
                  var s = i.nextUntil("." + a.divider, "." + a.collapsed);
                  return i.toggleClass(a.opened), s[i.hasClass(a.opened) ? "addClass" : "removeClass"](a.uncollapsed), 
                  !0;
              }
          }
          return !1;
      }
  }, e[t].defaults[n] = {
      add: !1,
      addTo: "panels",
      fixed: !1,
      collapse: !1
  }, e[t].configuration.classNames[n] = {
      collapsed: "Collapsed"
  };
  var a, i, s, o;
}(jQuery), function(e) {
  function t(e, t, n) {
      return t > e && (e = t), e > n && (e = n), e;
  }
  var n = "mmenu", a = "dragOpen";
  e[n].addons[a] = {
      setup: function() {
          if (this.opts.offCanvas) {
              var s = this, o = this.opts[a], l = this.conf[a];
              if (r = e[n].glbl, "boolean" == typeof o && (o = {
                  open: o
              }), "object" != typeof o && (o = {}), (o = this.opts[a] = e.extend(!0, {}, e[n].defaults[a], o)).open) {
                  var d, c, u, p, f, h = {}, m = 0, v = !1, g = !1, b = 0, y = 0;
                  switch (this.opts.offCanvas.position) {
                    case "left":
                    case "right":
                      h.events = "panleft panright", h.typeLower = "x", h.typeUpper = "X", g = "width";
                      break;

                    case "top":
                    case "bottom":
                      h.events = "panup pandown", h.typeLower = "y", h.typeUpper = "Y", g = "height";
                  }
                  switch (this.opts.offCanvas.position) {
                    case "right":
                    case "bottom":
                      h.negative = !0, p = function(e) {
                          e >= r.$wndw[g]() - o.maxStartPos && (m = 1);
                      };
                      break;

                    default:
                      h.negative = !1, p = function(e) {
                          e <= o.maxStartPos && (m = 1);
                      };
                  }
                  switch (this.opts.offCanvas.position) {
                    case "left":
                      h.open_dir = "right", h.close_dir = "left";
                      break;

                    case "right":
                      h.open_dir = "left", h.close_dir = "right";
                      break;

                    case "top":
                      h.open_dir = "down", h.close_dir = "up";
                      break;

                    case "bottom":
                      h.open_dir = "up", h.close_dir = "down";
                  }
                  switch (this.opts.offCanvas.zposition) {
                    case "front":
                      f = function() {
                          return this.$menu;
                      };
                      break;

                    default:
                      f = function() {
                          return e("." + i.slideout);
                      };
                  }
                  var C = this.__valueOrFn(o.pageNode, this.$menu, r.$page);
                  "string" == typeof C && (C = e(C)), new Hammer(C[0], o.vendors.hammer).on("panstart", function(e) {
                      p(e.center[h.typeLower]), r.$slideOutNodes = f(), v = h.open_dir;
                  }).on(h.events + " panend", function(e) {
                      m > 0 && e.preventDefault();
                  }).on(h.events, function(e) {
                      if (d = e["delta" + h.typeUpper], h.negative && (d = -d), d != b && (v = d >= b ? h.open_dir : h.close_dir), 
                      (b = d) > o.threshold && 1 == m) {
                          if (r.$html.hasClass(i.opened)) return;
                          m = 2, s._openSetup(), s.trigger("opening"), r.$html.addClass(i.dragging), y = t(r.$wndw[g]() * l[g].perc, l[g].min, l[g].max);
                      }
                      2 == m && (c = t(b, 10, y) - ("front" == s.opts.offCanvas.zposition ? y : 0), h.negative && (c = -c), 
                      u = "translate" + h.typeUpper + "(" + c + "px )", r.$slideOutNodes.css({
                          "-webkit-transform": "-webkit-" + u,
                          transform: u
                      }));
                  }).on("panend", function() {
                      2 == m && (r.$html.removeClass(i.dragging), r.$slideOutNodes.css("transform", ""), 
                      s[v == h.open_dir ? "_openFinish" : "close"]()), m = 0;
                  });
              }
          }
      },
      add: function() {
          return "function" != typeof Hammer || Hammer.VERSION < 2 ? void (e[n].addons[a].setup = function() {}) : (i = e[n]._c, 
          s = e[n]._d, o = e[n]._e, void i.add("dragging"));
      },
      clickAnchor: function() {}
  }, e[n].defaults[a] = {
      open: !1,
      maxStartPos: 100,
      threshold: 50,
      vendors: {
          hammer: {}
      }
  }, e[n].configuration[a] = {
      width: {
          perc: .8,
          min: 140,
          max: 440
      },
      height: {
          perc: .8,
          min: 140,
          max: 880
      }
  };
  var i, s, o, r;
}(jQuery), function(e) {
  var t = "mmenu", n = "fixedElements";
  e[t].addons[n] = {
      setup: function() {
          if (this.opts.offCanvas) {
              this.opts[n], this.conf[n], o = e[t].glbl;
              var a = function(e) {
                  var t = this.conf.classNames[n].fixed;
                  this.__refactorClass(e.find("." + t), t, "slideout").appendTo(o.$body);
              };
              a.call(this, o.$page), this.bind("setPage", a);
          }
      },
      add: function() {
          a = e[t]._c, i = e[t]._d, s = e[t]._e, a.add("fixed");
      },
      clickAnchor: function() {}
  }, e[t].configuration.classNames[n] = {
      fixed: "Fixed"
  };
  var a, i, s, o;
}(jQuery), function(e) {
  var t = "mmenu", n = "iconPanels";
  e[t].addons[n] = {
      setup: function() {
          var i = this, s = this.opts[n];
          if (this.conf[n], o = e[t].glbl, "boolean" == typeof s && (s = {
              add: s
          }), "number" == typeof s && (s = {
              add: !0,
              visible: s
          }), "object" != typeof s && (s = {}), s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s), 
          s.visible++, s.add) {
              this.$menu.addClass(a.iconpanel);
              for (var r = [], l = 0; l <= s.visible; l++) r.push(a.iconpanel + "-" + l);
              r = r.join(" ");
              var d = function(t) {
                  i.$menu.children("." + a.panel).removeClass(r).filter("." + a.subopened).removeClass(a.hidden).add(t).slice(-s.visible).each(function(t) {
                      e(this).addClass(a.iconpanel + "-" + t);
                  });
              };
              this.bind("openPanel", d), this.bind("init", function(t) {
                  d.call(i, i.$menu.children("." + a.current)), s.hideNavbars && t.removeClass(a.hasnavbar), 
                  t.each(function() {
                      e(this).children("." + a.subblocker).length || e(this).prepend('<a href="#' + e(this).closest("." + a.panel).attr("id") + '" class="' + a.subblocker + '" />');
                  });
              });
          }
      },
      add: function() {
          a = e[t]._c, i = e[t]._d, s = e[t]._e, a.add("iconpanel subblocker");
      },
      clickAnchor: function() {}
  }, e[t].defaults[n] = {
      add: !1,
      visible: 3,
      hideNavbars: !1
  };
  var a, i, s, o;
}(jQuery), function(e) {
  var t = "mmenu", n = "navbars";
  e[t].addons[n] = {
      setup: function() {
          var i = this, s = this.opts[n], r = this.conf[n];
          if (o = e[t].glbl, void 0 !== s) {
              s instanceof Array || (s = [ s ]);
              var l = {};
              e.each(s, function(o) {
                  var d = s[o];
                  "boolean" == typeof d && d && (d = {}), "object" != typeof d && (d = {}), void 0 === d.content && (d.content = [ "prev", "title" ]), 
                  d.content instanceof Array || (d.content = [ d.content ]);
                  var c = (d = e.extend(!0, {}, i.opts.navbar, d)).position, u = d.height;
                  "number" != typeof u && (u = 1), u = Math.min(4, Math.max(1, u)), "bottom" != c && (c = "top"), 
                  l[c] || (l[c] = 0), l[c]++;
                  var p = e("<div />").addClass(a.navbar + " " + a.navbar + "-" + c + " " + a.navbar + "-" + c + "-" + l[c] + " " + a.navbar + "-size-" + u);
                  l[c] += u - 1;
                  for (var f = 0, h = d.content.length; h > f; f++) {
                      var m = e[t].addons[n][d.content[f]] || !1;
                      m ? m.call(i, p, d, r) : ((m = d.content[f]) instanceof e || (m = e(d.content[f])), 
                      m.each(function() {
                          p.append(e(this));
                      }));
                  }
                  var v = Math.ceil(p.children().not("." + a.btn).length / u);
                  v > 1 && p.addClass(a.navbar + "-content-" + v), p.children("." + a.btn).length && p.addClass(a.hasbtns), 
                  p.prependTo(i.$menu);
              });
              for (var d in l) i.$menu.addClass(a.hasnavbar + "-" + d + "-" + l[d]);
          }
      },
      add: function() {
          a = e[t]._c, i = e[t]._d, s = e[t]._e, a.add("close hasbtns");
      },
      clickAnchor: function() {}
  }, e[t].configuration[n] = {
      breadcrumbSeparator: "/"
  }, e[t].configuration.classNames[n] = {
      panelTitle: "Title",
      panelNext: "Next",
      panelPrev: "Prev"
  };
  var a, i, s, o;
}(jQuery), function(e) {
  var t = "mmenu";
  e[t].addons.navbars.breadcrumbs = function(n, a, i) {
      var s = e[t]._c, o = e[t]._d;
      s.add("breadcrumbs separator"), n.append('<span class="' + s.breadcrumbs + '"></span>'), 
      this.bind("init", function(t) {
          t.removeClass(s.hasnavbar).each(function() {
              for (var t = [], n = e(this), a = e('<span class="' + s.breadcrumbs + '"></span>'), r = e(this).children().first(), l = !0; r && r.length; ) {
                  r.is("." + s.panel) || (r = r.closest("." + s.panel));
                  var d = r.children("." + s.navbar).children("." + s.title).text();
                  t.unshift(l ? "<span>" + d + "</span>" : '<a href="#' + r.attr("id") + '">' + d + "</a>"), 
                  l = !1, r = r.data(o.parent);
              }
              a.append(t.join('<span class="' + s.separator + '">' + i.breadcrumbSeparator + "</span>")).appendTo(n.children("." + s.navbar));
          });
      });
      var r = function() {
          var e = this.$menu.children("." + s.current), t = n.find("." + s.breadcrumbs), a = e.children("." + s.navbar).children("." + s.breadcrumbs);
          t.html(a.html());
      };
      this.bind("openPanel", r), this.bind("init", r);
  };
}(jQuery), function(e) {
  var t = "mmenu";
  e[t].addons.navbars.close = function(n) {
      var a = e[t]._c, i = e[t].glbl;
      n.append('<a class="' + a.close + " " + a.btn + '" href="#"></a>');
      var s = function(e) {
          n.find("." + a.close).attr("href", "#" + e.attr("id"));
      };
      s.call(this, i.$page), this.bind("setPage", s);
  };
}(jQuery), function(e) {
  var t = "mmenu", n = "navbars";
  e[t].addons[n].next = function(a) {
      var i = e[t]._c;
      a.append('<a class="' + i.next + " " + i.btn + '" href="#"></a>');
      var s = function(e) {
          e = e || this.$menu.children("." + i.current);
          var t = a.find("." + i.next), s = e.find("." + this.conf.classNames[n].panelNext), o = s.attr("href"), r = s.html();
          t[o ? "attr" : "removeAttr"]("href", o), t[o || r ? "removeClass" : "addClass"](i.hidden), 
          t.html(r);
      };
      this.bind("openPanel", s), this.bind("init", function() {
          s.call(this);
      });
  };
}(jQuery), function(e) {
  var t = "mmenu", n = "navbars";
  e[t].addons[n].prev = function(a) {
      var i = e[t]._c;
      a.append('<a class="' + i.prev + " " + i.btn + '" href="#"></a>'), this.bind("init", function(e) {
          e.removeClass(i.hasnavbar);
      });
      var s = function() {
          var e = this.$menu.children("." + i.current), t = a.find("." + i.prev), s = e.find("." + this.conf.classNames[n].panelPrev);
          s.length || (s = e.children("." + i.navbar).children("." + i.prev));
          var o = s.attr("href"), r = s.html();
          t[o ? "attr" : "removeAttr"]("href", o), t[o || r ? "removeClass" : "addClass"](i.hidden), 
          t.html(r);
      };
      this.bind("openPanel", s), this.bind("init", s);
  };
}(jQuery), function(e) {
  var t = "mmenu";
  e[t].addons.navbars.searchfield = function(n) {
      var a = e[t]._c, i = e('<div class="' + a.search + '" />').appendTo(n);
      "object" != typeof this.opts.searchfield && (this.opts.searchfield = {}), this.opts.searchfield.add = !0, 
      this.opts.searchfield.addTo = i;
  };
}(jQuery), function(e) {
  var t = "mmenu", n = "navbars";
  e[t].addons[n].title = function(a, i) {
      var s = e[t]._c;
      a.append('<a class="' + s.title + '"></a>');
      var o = function(e) {
          e = e || this.$menu.children("." + s.current);
          var t = a.find("." + s.title), o = e.find("." + this.conf.classNames[n].panelTitle);
          o.length || (o = e.children("." + s.navbar).children("." + s.title));
          var r = o.attr("href"), l = o.html() || i.title;
          t[r ? "attr" : "removeAttr"]("href", r), t[r || l ? "removeClass" : "addClass"](s.hidden), 
          t.html(l);
      };
      this.bind("openPanel", o), this.bind("init", function() {
          o.call(this);
      });
  };
}(jQuery), function(e) {
  function t(e) {
      switch (e) {
        case 9:
        case 16:
        case 17:
        case 18:
        case 37:
        case 38:
        case 39:
        case 40:
          return !0;
      }
      return !1;
  }
  var n = "mmenu", a = "searchfield";
  e[n].addons[a] = {
      setup: function() {
          var l = this, d = this.opts[a], c = this.conf[a];
          r = e[n].glbl, "boolean" == typeof d && (d = {
              add: d
          }), "object" != typeof d && (d = {}), d = this.opts[a] = e.extend(!0, {}, e[n].defaults[a], d), 
          this.bind("close", function() {
              this.$menu.find("." + i.search).find("input").blur();
          }), this.bind("init", function(n) {
              if (d.add) {
                  switch (d.addTo) {
                    case "panels":
                      a = n;
                      break;

                    default:
                      var a = e(d.addTo, this.$menu);
                  }
                  a.each(function() {
                      var t = e(this);
                      if (!t.is("." + i.panel) || !t.is("." + i.vertical)) {
                          if (!t.children("." + i.search).length) {
                              var n = c.form ? "form" : "div", a = e("<" + n + ' class="' + i.search + '" />');
                              if (c.form && "object" == typeof c.form) for (var s in c.form) a.attr(s, c.form[s]);
                              a.append('<input placeholder="' + d.placeholder + '" type="text" autocomplete="off" />'), 
                              t.hasClass(i.search) ? t.replaceWith(a) : t.prepend(a).addClass(i.hassearch);
                          }
                          if (d.noResults && (t.closest("." + i.panel).length || (t = l.$menu.children("." + i.panel).first()), 
                          !t.children("." + i.noresultsmsg).length)) {
                              var o = t.children("." + i.listview).first();
                              e('<div class="' + i.noresultsmsg + '" />').append(d.noResults)[o.length ? "insertAfter" : "prependTo"](o.length ? o : t);
                          }
                      }
                  }), d.search && e("." + i.search, this.$menu).each(function() {
                      var n = e(this), a = n.closest("." + i.panel).length;
                      if (a) var r = n.closest("." + i.panel), c = r; else var r = e("." + i.panel, l.$menu), c = l.$menu;
                      var u = n.children("input"), p = l.__findAddBack(r, "." + i.listview).children("li"), f = p.filter("." + i.divider), h = l.__filterListItems(p), m = function() {
                          var t = u.val().toLowerCase();
                          r.scrollTop(0), h.add(f).addClass(i.hidden).find("." + i.fullsubopensearch).removeClass(i.fullsubopen).removeClass(i.fullsubopensearch), 
                          h.each(function() {
                              var n = e(this), a = "> a";
                              (d.showTextItems || d.showSubPanels && n.find("." + i.next)) && (a = "> a, > span"), 
                              e(a, n).text().toLowerCase().indexOf(t) > -1 && n.add(n.prevAll("." + i.divider).first()).removeClass(i.hidden);
                          }), d.showSubPanels && r.each(function() {
                              var t = e(this);
                              l.__filterListItems(t.find("." + i.listview).children()).each(function() {
                                  var t = e(this), n = t.data(s.sub);
                                  t.removeClass(i.nosubresults), n && n.find("." + i.listview).children().removeClass(i.hidden);
                              });
                          }), e(r.get().reverse()).each(function(t) {
                              var n = e(this), o = n.data(s.parent);
                              o && (l.__filterListItems(n.find("." + i.listview).children()).length ? (o.hasClass(i.hidden) && o.children("." + i.next).not("." + i.fullsubopen).addClass(i.fullsubopen).addClass(i.fullsubopensearch), 
                              o.removeClass(i.hidden).removeClass(i.nosubresults).prevAll("." + i.divider).first().removeClass(i.hidden)) : a || (n.hasClass(i.opened) && setTimeout(function() {
                                  l.openPanel(o.closest("." + i.panel));
                              }, 1.5 * (t + 1) * l.conf.openingInterval), o.addClass(i.nosubresults)));
                          }), c[h.not("." + i.hidden).length ? "removeClass" : "addClass"](i.noresults), this.update();
                      };
                      u.off(o.keyup + "-searchfield " + o.change + "-searchfield").on(o.keyup + "-searchfield", function(e) {
                          t(e.keyCode) || m.call(l);
                      }).on(o.change + "-searchfield", function() {
                          m.call(l);
                      });
                  });
              }
          });
      },
      add: function() {
          i = e[n]._c, s = e[n]._d, o = e[n]._e, i.add("search hassearch noresultsmsg noresults nosubresults fullsubopensearch"), 
          o.add("change keyup");
      },
      clickAnchor: function() {}
  }, e[n].defaults[a] = {
      add: !1,
      addTo: "panels",
      search: !0,
      placeholder: "Search",
      noResults: "No results found.",
      showTextItems: !1,
      showSubPanels: !0
  }, e[n].configuration[a] = {
      form: !1
  };
  var i, s, o, r;
}(jQuery), function(e) {
  var t = "mmenu", n = "sectionIndexer";
  e[t].addons[n] = {
      setup: function() {
          var i = this, r = this.opts[n];
          this.conf[n], o = e[t].glbl, "boolean" == typeof r && (r = {
              add: r
          }), "object" != typeof r && (r = {}), r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r), 
          this.bind("init", function(t) {
              if (r.add) {
                  switch (r.addTo) {
                    case "panels":
                      n = t;
                      break;

                    default:
                      var n = e(r.addTo, this.$menu).filter("." + a.panel);
                  }
                  n.find("." + a.divider).closest("." + a.panel).addClass(a.hasindexer);
              }
              if (!this.$indexer && this.$menu.children("." + a.hasindexer).length) {
                  this.$indexer = e('<div class="' + a.indexer + '" />').prependTo(this.$menu).append('<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>'), 
                  this.$indexer.children().on(s.mouseover + "-sectionindexer " + a.touchstart + "-sectionindexer", function() {
                      var t = e(this).attr("href").slice(1), n = i.$menu.children("." + a.current), s = n.find("." + a.listview), o = !1, r = n.scrollTop(), l = s.position().top + parseInt(s.css("margin-top"), 10) + parseInt(s.css("padding-top"), 10) + r;
                      n.scrollTop(0), s.children("." + a.divider).not("." + a.hidden).each(function() {
                          !1 === o && t == e(this).text().slice(0, 1).toLowerCase() && (o = e(this).position().top + l);
                      }), n.scrollTop(!1 !== o ? o : r);
                  });
                  var o = function(e) {
                      i.$menu[(e.hasClass(a.hasindexer) ? "add" : "remove") + "Class"](a.hasindexer);
                  };
                  this.bind("openPanel", o), o.call(this, this.$menu.children("." + a.current));
              }
          });
      },
      add: function() {
          a = e[t]._c, i = e[t]._d, s = e[t]._e, a.add("indexer hasindexer"), s.add("mouseover touchstart");
      },
      clickAnchor: function(e) {
          return !!e.parent().is("." + a.indexer) || void 0;
      }
  }, e[t].defaults[n] = {
      add: !1,
      addTo: "panels"
  };
  var a, i, s, o;
}(jQuery), function(e) {
  var t = "mmenu", n = "toggles";
  e[t].addons[n] = {
      setup: function() {
          var i = this;
          this.opts[n], this.conf[n], o = e[t].glbl, this.bind("init", function(t) {
              this.__refactorClass(e("input", t), this.conf.classNames[n].toggle, "toggle"), this.__refactorClass(e("input", t), this.conf.classNames[n].check, "check"), 
              e("input." + a.toggle + ", input." + a.check, t).each(function() {
                  var t = e(this), n = t.closest("li"), s = t.hasClass(a.toggle) ? "toggle" : "check", o = t.attr("id") || i.__getUniqueId();
                  n.children('label[for="' + o + '"]').length || (t.attr("id", o), n.prepend(t), e('<label for="' + o + '" class="' + a[s] + '"></label>').insertBefore(n.children("a, span").last()));
              });
          });
      },
      add: function() {
          a = e[t]._c, i = e[t]._d, s = e[t]._e, a.add("toggle check");
      },
      clickAnchor: function() {}
  }, e[t].configuration.classNames[n] = {
      toggle: "Toggle",
      check: "Check"
  };
  var a, i, s, o;
}(jQuery), function(e) {
  var t = "mmenu", n = "fixedElements";
  e[t].addons[n] = {
      setup: function() {
          if (this.opts.offCanvas) {
              this.opts[n], this.conf[n], o = e[t].glbl;
              var a = function(e) {
                  var t = this.conf.classNames[n].fixed;
                  this.__refactorClass(e.find("." + t), t, "slideout").appendTo(o.$body);
              };
              a.call(this, o.$page), this.bind("setPage", a);
          }
      },
      add: function() {
          a = e[t]._c, i = e[t]._d, s = e[t]._e, a.add("fixed");
      },
      clickAnchor: function() {}
  }, e[t].configuration.classNames[n] = {
      fixed: "Fixed"
  };
  var a, i, s, o;
}(jQuery), jQuery(function(e) {
  e(document).ready(function() {
      e("a.toggle-location-numbers").click(function() {
          e(".mobile-location-numbers").toggleClass("show-mobile-location-numbers");
      }), e("body").adtrakCookies(), e("#mmenu").mmenu({
          offCanvas: {
              position: "right"
          }
      });
      var t = e(".mobile-top-bar").height();
      e("body").css("padding-top", t), e("#back-top").hide(), e(function() {
          e(window).scroll(function() {
              e(this).scrollTop() > 300 ? e("#back-top").fadeIn() : e("#back-top").fadeOut();
          });
      }), e("#back-top").click(function() {
          e("html, body").animate({
              scrollTop: e("html").offset().top
          }, 750);
      });
  });
});

var ld_version = 1.2, ld_var = ld_var || {}, ld_json = ld_var.ld_json || "includes/ld/phonenumbers.json", ld_message = ld_var.ld_message || "Call Locally on Mobile", ld_breakpoint = ld_var.ld_breakpoint || 769, ld_default = "", ld_defaultarea = "", ld_calltag = "", addEvent = function() {
  var e = function(e, t, n) {
      for (var a = 0, i = e.length; a < i; a++) addEvent(e[a], t, n);
  };
  return document.addEventListener ? function(t, n, a) {
      t && t.nodeName || t === window ? t.addEventListener(n, a, !1) : t && t.length && e(t, n, a);
  } : function(t, n, a) {
      t && t.nodeName || t === window ? t.attachEvent("on" + n, function() {
          return a.call(t, window.event);
      }) : t && t.length && e(t, n, a);
  };
}(), getElementsByClassName = function(e, t, n) {
  return (getElementsByClassName = document.getElementsByClassName ? function(e, t, n) {
      for (var a, i = (n = n || document).getElementsByClassName(e), s = t ? new RegExp("\\b" + t + "\\b", "i") : null, o = [], r = 0, l = i.length; r < l; r += 1) a = i[r], 
      s && !s.test(a.nodeName) || o.push(a);
      return o;
  } : document.evaluate ? function(e, t, n) {
      t = t || "*", n = n || document;
      for (var a, i, s = e.split(" "), o = "", r = "http://www.w3.org/1999/xhtml", l = document.documentElement.namespaceURI === r ? r : null, d = [], c = 0, u = s.length; c < u; c += 1) o += "[contains(concat(' ', @class, ' '), ' " + s[c] + " ')]";
      try {
          a = document.evaluate(".//" + t + o, n, l, 0, null);
      } catch (e) {
          a = document.evaluate(".//" + t + o, n, null, 0, null);
      }
      for (;i = a.iterateNext(); ) d.push(i);
      return d;
  } : function(e, t, n) {
      t = t || "*", n = n || document;
      for (var a, i, s = e.split(" "), o = [], r = "*" === t && n.all ? n.all : n.getElementsByTagName(t), l = [], d = 0, c = s.length; d < c; d += 1) o.push(new RegExp("(^|\\s)" + s[d] + "(\\s|$)"));
      for (var u = 0, p = r.length; u < p; u += 1) {
          a = r[u], i = !1;
          for (var f = 0, h = o.length; f < h && (i = o[f].test(a.className)); f += 1) ;
          i && l.push(a);
      }
      return l;
  })(e, t, n);
};

"object" != typeof JSON && (JSON = {}), function() {
  "use strict";
  function f(e) {
      return e < 10 ? "0" + e : e;
  }
  function quote(e) {
      return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
          var t = meta[e];
          return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + e + '"';
  }
  function str(e, t) {
      var n, a, i, s, o, r = gap, l = t[e];
      switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(e)), 
      "function" == typeof rep && (l = rep.call(t, e, l)), typeof l) {
        case "string":
          return quote(l);

        case "number":
          return isFinite(l) ? String(l) : "null";

        case "boolean":
        case "null":
          return String(l);

        case "object":
          if (!l) return "null";
          if (gap += indent, o = [], "[object Array]" === Object.prototype.toString.apply(l)) {
              for (s = l.length, n = 0; n < s; n += 1) o[n] = str(n, l) || "null";
              return i = 0 === o.length ? "[]" : gap ? "[\n" + gap + o.join(",\n" + gap) + "\n" + r + "]" : "[" + o.join(",") + "]", 
              gap = r, i;
          }
          if (rep && "object" == typeof rep) for (s = rep.length, n = 0; n < s; n += 1) "string" == typeof rep[n] && (i = str(a = rep[n], l)) && o.push(quote(a) + (gap ? ": " : ":") + i); else for (a in l) Object.prototype.hasOwnProperty.call(l, a) && (i = str(a, l)) && o.push(quote(a) + (gap ? ": " : ":") + i);
          return i = 0 === o.length ? "{}" : gap ? "{\n" + gap + o.join(",\n" + gap) + "\n" + r + "}" : "{" + o.join(",") + "}", 
          gap = r, i;
      }
  }
  "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
  }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
      return this.valueOf();
  });
  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
  }, rep;
  "function" != typeof JSON.stringify && (JSON.stringify = function(e, t, n) {
      var a;
      if (gap = "", indent = "", "number" == typeof n) for (a = 0; a < n; a += 1) indent += " "; else "string" == typeof n && (indent = n);
      if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
      return str("", {
          "": e
      });
  }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
      function walk(e, t) {
          var n, a, i = e[t];
          if (i && "object" == typeof i) for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (void 0 !== (a = walk(i, n)) ? i[n] = a : delete i[n]);
          return reviver.call(e, t, i);
      }
      var j;
      if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
          return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
      })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), 
      "function" == typeof reviver ? walk({
          "": j
      }, "") : j;
      throw new SyntaxError("JSON.parse");
  });
}();

var deviceCheck = {
  isIPhone: function() {
      return -1 != navigator.platform.indexOf("iPhone") || -1 != navigator.platform.indexOf("iPod");
  },
  isIPad: function() {
      return -1 != navigator.platform.indexOf("iPad");
  },
  isAndroidMobile: function() {
      var e = navigator.userAgent.toLowerCase();
      return e.indexOf("android") > -1 && e.indexOf("mobile");
  },
  isAndroidTablet: function() {
      var e = navigator.userAgent.toLowerCase();
      return e.indexOf("android") > -1 && !e.indexOf("mobile");
  },
  isBlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  isOpera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  isWindows: function() {
      return navigator.userAgent.match(/IEMobile/i);
  },
  isMobile: function() {
      return deviceCheck.isIPhone() || deviceCheck.isAndroidMobile() || deviceCheck.isBlackBerry() || deviceCheck.isOpera() || deviceCheck.isWindows();
  },
  isTablet: function() {
      return deviceCheck.isIPad() || deviceCheck.isAndroidTablet();
  }
}, toggleClass = function(e, t) {
  e && (e.className.indexOf(t) ? e.className = e.className.replace(t, "") : e.className += " " + t);
};

ld_ready(function() {
  fetchJSONFile(ld_json, function(e) {
      if (deviceCheck.isMobile()) t = "mobile"; else if (deviceCheck.isTablet()) t = "tablet"; else var t = "computer";
      var n = 0, a = e.locationdynamics.locations, i = getURLParameter("a");
      null != i && (i = (i = (i = i.replace("smartphone(", "")).replace("tablet(", "")).replace(")", ""));
      for (var s in a) {
          var o = a[s].source.organic[t];
          "" !== o && void 0 !== o && null !== o || (o = a[s].source.organic.computer), "" === o || void 0 === o || null === o || n++;
      }
      if ("gen" == i) setCookie("area", i, 2592e3), "" !== (ld_default = e.locationdynamics.default.source["google-adwords"][t]) && void 0 !== ld_default && null !== ld_default || (ld_default = e.locationdynamics.locations[i].source["google-adwords"].computer), 
      ld_defaultarea = e.locationdynamics.default.area, ld_calltag = e.locationdynamics.default.calltag, 
      addClass("ld-phonenumber", "ld-single"), hideClass("ld-page"), hideClass("ld-locationnumbers"), 
      hideClass("ld-locationnumbers-list"), hideClass("ld-locationnumbers-custom"); else if (null !== i && i in a) setCookie("area", i, 2592e3), 
      "" !== (ld_default = e.locationdynamics.locations[i].source["google-adwords"][t]) && void 0 !== ld_default && null !== ld_default || (ld_default = e.locationdynamics.locations[i].source["google-adwords"].computer), 
      ld_defaultarea = e.locationdynamics.locations[i].area, ld_calltag = e.locationdynamics.locations[i].calltag, 
      addClass("ld-phonenumber", "ld-single"), hideClass("ld-page"), hideClass("ld-locationnumbers"), 
      hideClass("ld-locationnumbers-list"), hideClass("ld-locationnumbers-custom"); else if ("gen" == getCookie("area")) "" !== (ld_default = e.locationdynamics.default.source["google-adwords"][t]) && void 0 !== ld_default && null !== ld_default || (ld_default = e.locationdynamics.default.source["google-adwords"].computer), 
      ld_defaultarea = e.locationdynamics.default.area, ld_calltag = e.locationdynamics.default.calltag, 
      addClass("ld-phonenumber", "ld-single"), hideClass("ld-page"), hideClass("ld-locationnumbers"), 
      hideClass("ld-locationnumbers-list"), hideClass("ld-locationnumbers-custom"); else if (null !== getCookie("area") && getCookie("area") in a) "" !== (ld_default = e.locationdynamics.locations[getCookie("area")].source["google-adwords"][t]) && void 0 !== ld_default && null !== ld_default || (ld_default = e.locationdynamics.locations[getCookie("area")].source["google-adwords"].computer), 
      ld_defaultarea = e.locationdynamics.locations[getCookie("area")].area, ld_calltag = e.locationdynamics.locations[getCookie("area")].calltag, 
      addClass("ld-phonenumber", "ld-single"), hideClass("ld-page"), hideClass("ld-locationnumbers"), 
      hideClass("ld-locationnumbers-list"), hideClass("ld-locationnumbers-custom"); else if (null !== getUserVariable("ld_fixed") && getUserVariable("ld_fixed") in a) "" !== (ld_default = e.locationdynamics.locations[getUserVariable("ld_fixed")].source.organic[t]) && void 0 !== ld_default && null !== ld_default || (ld_default = e.locationdynamics.locations[getUserVariable("ld_fixed")].source.organic.computer), 
      ld_defaultarea = e.locationdynamics.locations[getUserVariable("ld_fixed")].area, 
      ld_calltag = e.locationdynamics.locations[getUserVariable("ld_fixed")].calltag, 
      addClass("ld-phonenumber", "ld-single"); else {
          "" !== (ld_default = e.locationdynamics.default.source.organic[t]) && void 0 !== ld_default && null !== ld_default || (ld_default = e.locationdynamics.default.source.organic.computer), 
          ld_defaultarea = e.locationdynamics.default.area, ld_calltag = e.locationdynamics.default.calltag;
          var r = "", l = 0;
          for (var d in a) {
              l++;
              var c = a[d].area, u = a[d].source.organic[t];
              "" !== u && void 0 !== u && null !== u || (u = a[d].source.organic.computer), "" === u || void 0 === u || null === u || (1 === n ? r += "mobile" === t ? '<div class="ld-areanum ld-id-' + l + '"><span class="ld-number"><a href="tel:' + u + '">' + u + "</a></span></div>" : '<div class="ld-areanum ld-id-' + l + '"><span class="ld-number">' + u + "</span></div>" : n > 1 && (r += "mobile" === t ? '<div class="ld-areanum ld-id-' + l + '"><span class="ld-area">' + c + '</span> <span class="ld-number"><a href="tel:' + u + '">' + u + "</a></span></div>" : '<div class="ld-areanum ld-id-' + l + '"><span class="ld-area">' + c + '</span> <span class="ld-number">' + u + "</span></div> "));
          }
          var p = getElementsByClassName("ld-locationnumbers");
          if (n > 3) for (h = 0; h < p.length; h++) p[h].innerHTML = '<a href="#" class="ld-showhide">' + ld_message + '</a><div class="ld-dropdown">' + r + "</div>"; else for (h = 0; h < p.length; h++) p[h].innerHTML = r;
          for (var f = getElementsByClassName("ld-locationnumbers-list"), h = 0; h < f.length; h++) f[h].innerHTML = r;
          for (var m = getElementsByClassName("ld-locationnumbers-dropdown"), h = 0; h < m.length; h++) m[h].innerHTML = '<a href="#" class="ld-showhide">' + ld_message + '</a><div class="ld-dropdown">' + r + "</div>";
          for (var v = getElementsByClassName("ld-locationnumbers-responsive"), h = 0; h < v.length; h++) {
              var g = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
              v[h].innerHTML = g < ld_breakpoint ? '<a href="#" class="ld-showhide">' + ld_message + '</a><div class="ld-dropdown">' + r + "</div>" : r;
          }
          var b = getElementsByClassName("ld-locationnumbers-custom");
          if (n > 3) for (h = 0; h < b.length; h++) b[h].innerHTML = '<a href="#" class="ld-showhide">' + ld_message + '</a><div class="ld-dropdown">' + b[h].innerHTML + "</div>";
          for (var y = getElementsByClassName("ld-locationnumbers-custom-content"), h = 0; h < y.length; h++) y[h].innerHTML = r;
          addShowHideEvent(document);
      }
      window.onresize = function() {
          for (var e = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), t = getElementsByClassName("ld-locationnumbers-responsive"), n = 0; n < t.length; n++) {
              for (var a = document.createElement("div"), i = t[n].getElementsByClassName("ld-areanum"), s = 0; s < i.length; s++) a.appendChild(i[s].cloneNode(!0));
              t[n].innerHTML = e < ld_breakpoint ? '<a href="#" class="ld-showhide">' + ld_message + '</a><div class="ld-dropdown">' + a.innerHTML + "</div>" : a.innerHTML, 
              addShowHideEvent(t[n]);
          }
      }, "mobile" === t && (ld_default = '<a href="tel:' + ld_default + '">' + ld_default + "</a>"), 
      replaceClassContent("ld-phonenumber", ld_default), replaceClassContent("ld-defaultarea", ld_defaultarea), 
      replaceClassContent("ld-calltag", ld_calltag);
  });
});

!function(t, e, i, s) {
    function n(e, i) {
        this.settings = null,
        this.options = t.extend({}, n.Defaults, i),
        this.$element = t(e),
        this.drag = t.extend({}, p),
        this.state = t.extend({}, u),
        this.e = t.extend({}, g),
        this._plugins = {},
        this._supress = {},
        this._current = null,
        this._speed = null,
        this._coordinates = [],
        this._breakpoint = null,
        this._width = null,
        this._items = [],
        this._clones = [],
        this._mergers = [],
        this._invalidated = {},
        this._pipe = [],
        t.each(n.Plugins, t.proxy(function(t, e) {
            this._plugins[t[0].toLowerCase() + t.slice(1)] = new e(this)
        }, this)),
        t.each(n.Pipe, t.proxy(function(e, i) {
            this._pipe.push({
                filter: i.filter,
                run: t.proxy(i.run, this)
            })
        }, this)),
        this.setup(),
        this.initialize()
    }
    function o(t) {
        if (t.touches !== s)
            return {
                x: t.touches[0].pageX,
                y: t.touches[0].pageY
            };
        if (t.touches === s) {
            if (t.pageX !== s)
                return {
                    x: t.pageX,
                    y: t.pageY
                };
            if (t.pageX === s)
                return {
                    x: t.clientX,
                    y: t.clientY
                }
        }
    }
    function r(t) {
        var e, s, n = i.createElement("div"), o = t;
        for (e in o)
            if (s = o[e],
            "undefined" != typeof n.style[s])
                return n = null,
                [s, e];
        return [!1]
    }
    function a() {
        return r(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }
    function h() {
        return r(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }
    function l() {
        return r(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }
    function d() {
        return "ontouchstart"in e || !!navigator.msMaxTouchPoints
    }
    function c() {
        return e.navigator.msPointerEnabled
    }
    var p, u, g;
    p = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    },
    u = {
        isTouch: !1,
        isScrolling: !1,
        isSwiping: !1,
        direction: !1,
        inMotion: !1
    },
    g = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    },
    n.Defaults = {
        items: 4,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    },
    n.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    },
    n.Plugins = {},
    n.Pipe = [{
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var t = this._clones
              , e = this.$stage.children(".cloned");
            (e.length !== t.length || !this.settings.loop && t.length > 0) && (this.$stage.children(".cloned").remove(),
            this._clones = [])
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var t, e, i = this._clones, s = this._items, n = this.settings.loop ? i.length - Math.max(2 * this.settings.items, 4) : 0;
            for (t = 0,
            e = Math.abs(n / 2); e > t; t++)
                n > 0 ? (this.$stage.children().eq(s.length + i.length - 1).remove(),
                i.pop(),
                this.$stage.children().eq(0).remove(),
                i.pop()) : (i.push(i.length / 2),
                this.$stage.append(s[i[i.length - 1]].clone().addClass("cloned")),
                i.push(s.length - 1 - (i.length - 1) / 2),
                this.$stage.prepend(s[i[i.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var t, e, i, s = this.settings.rtl ? 1 : -1, n = (this.width() / this.settings.items).toFixed(3), o = 0;
            for (this._coordinates = [],
            e = 0,
            i = this._clones.length + this._items.length; i > e; e++)
                t = this._mergers[this.relative(e)],
                t = this.settings.mergeFit && Math.min(t, this.settings.items) || t,
                o += (this.settings.autoWidth ? this._items[this.relative(e)].width() + this.settings.margin : n * t) * s,
                this._coordinates.push(o)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var e, i, s = (this.width() / this.settings.items).toFixed(3), n = {
                width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                "padding-left": this.settings.stagePadding || "",
                "padding-right": this.settings.stagePadding || ""
            };
            if (this.$stage.css(n),
            n = {
                width: this.settings.autoWidth ? "auto" : s - this.settings.margin
            },
            n[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin,
            !this.settings.autoWidth && t.grep(this._mergers, function(t) {
                return t > 1
            }).length > 0)
                for (e = 0,
                i = this._coordinates.length; i > e; e++)
                    n.width = Math.abs(this._coordinates[e]) - Math.abs(this._coordinates[e - 1] || 0) - this.settings.margin,
                    this.$stage.children().eq(e).css(n);
            else
                this.$stage.children().css(n)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current && this.reset(this.$stage.children().index(t.current))
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var t, e, i, s, n = this.settings.rtl ? 1 : -1, o = 2 * this.settings.stagePadding, r = this.coordinates(this.current()) + o, a = r + this.width() * n, h = [];
            for (i = 0,
            s = this._coordinates.length; s > i; i++)
                t = this._coordinates[i - 1] || 0,
                e = Math.abs(this._coordinates[i]) + o * n,
                (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && h.push(i);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass),
            this.$stage.children(":eq(" + h.join("), :eq(") + ")").addClass(this.settings.activeClass),
            this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass),
            this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }],
    n.prototype.initialize = function() {
        if (this.trigger("initialize"),
        this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl),
        this.browserSupport(),
        this.settings.autoWidth && this.state.imagesLoaded !== !0) {
            var e, i, n;
            if (e = this.$element.find("img"),
            i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : s,
            n = this.$element.children(i).width(),
            e.length && 0 >= n)
                return this.preloadAutoWidthImages(e),
                !1
        }
        this.$element.addClass("owl-loading"),
        this.$stage = t("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        this._width = this.$element.width(),
        this.refresh(),
        this.$element.removeClass("owl-loading").addClass("owl-loaded"),
        this.eventsCall(),
        this.internalEvents(),
        this.addTriggerableEvents(),
        this.trigger("initialized")
    }
    ,
    n.prototype.setup = function() {
        var e = this.viewport()
          , i = this.options.responsive
          , s = -1
          , n = null;
        i ? (t.each(i, function(t) {
            e >= t && t > s && (s = Number(t))
        }),
        n = t.extend({}, this.options, i[s]),
        delete n.responsive,
        n.responsiveClass && this.$element.attr("class", function(t, e) {
            return e.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + s)) : n = t.extend({}, this.options),
        (null === this.settings || this._breakpoint !== s) && (this.trigger("change", {
            property: {
                name: "settings",
                value: n
            }
        }),
        this._breakpoint = s,
        this.settings = n,
        this.invalidate("settings"),
        this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }
    ,
    n.prototype.optionsLogic = function() {
        this.$element.toggleClass("owl-center", this.settings.center),
        this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1),
        this.settings.autoWidth && (this.settings.stagePadding = !1,
        this.settings.merge = !1)
    }
    ,
    n.prototype.prepare = function(e) {
        var i = this.trigger("prepare", {
            content: e
        });
        return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(e)),
        this.trigger("prepared", {
            content: i.data
        }),
        i.data
    }
    ,
    n.prototype.update = function() {
        for (var e = 0, i = this._pipe.length, s = t.proxy(function(t) {
            return this[t]
        }, this._invalidated), n = {}; i > e; )
            (this._invalidated.all || t.grep(this._pipe[e].filter, s).length > 0) && this._pipe[e].run(n),
            e++;
        this._invalidated = {}
    }
    ,
    n.prototype.width = function(t) {
        switch (t = t || n.Width.Default) {
        case n.Width.Inner:
        case n.Width.Outer:
            return this._width;
        default:
            return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }
    ,
    n.prototype.refresh = function() {
        if (0 === this._items.length)
            return !1;
        (new Date).getTime();
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$stage.addClass("owl-refresh"),
        this.update(),
        this.$stage.removeClass("owl-refresh"),
        this.state.orientation = e.orientation,
        this.watchVisibility(),
        this.trigger("refreshed")
    }
    ,
    n.prototype.eventsCall = function() {
        this.e._onDragStart = t.proxy(function(t) {
            this.onDragStart(t)
        }, this),
        this.e._onDragMove = t.proxy(function(t) {
            this.onDragMove(t)
        }, this),
        this.e._onDragEnd = t.proxy(function(t) {
            this.onDragEnd(t)
        }, this),
        this.e._onResize = t.proxy(function(t) {
            this.onResize(t)
        }, this),
        this.e._transitionEnd = t.proxy(function(t) {
            this.transitionEnd(t)
        }, this),
        this.e._preventClick = t.proxy(function(t) {
            this.preventClick(t)
        }, this)
    }
    ,
    n.prototype.onThrottledResize = function() {
        e.clearTimeout(this.resizeTimer),
        this.resizeTimer = e.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }
    ,
    n.prototype.onResize = function() {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(),
        this.invalidate("width"),
        this.refresh(),
        void this.trigger("resized")) : !1
    }
    ,
    n.prototype.eventsRouter = function(t) {
        var e = t.type;
        "mousedown" === e || "touchstart" === e ? this.onDragStart(t) : "mousemove" === e || "touchmove" === e ? this.onDragMove(t) : "mouseup" === e || "touchend" === e ? this.onDragEnd(t) : "touchcancel" === e && this.onDragEnd(t)
    }
    ,
    n.prototype.internalEvents = function() {
        var i = (d(),
        c());
        this.settings.mouseDrag ? (this.$stage.on("mousedown", t.proxy(function(t) {
            this.eventsRouter(t)
        }, this)),
        this.$stage.on("dragstart", function() {
            return !1
        }),
        this.$stage.get(0).onselectstart = function() {
            return !1
        }
        ) : this.$element.addClass("owl-text-select-on"),
        this.settings.touchDrag && !i && this.$stage.on("touchstart touchcancel", t.proxy(function(t) {
            this.eventsRouter(t)
        }, this)),
        this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1),
        this.settings.responsive !== !1 && this.on(e, "resize", t.proxy(this.onThrottledResize, this))
    }
    ,
    n.prototype.onDragStart = function(s) {
        var n, r, a, h;
        if (n = s.originalEvent || s || e.event,
        3 === n.which || this.state.isTouch)
            return !1;
        if ("mousedown" === n.type && this.$stage.addClass("owl-grab"),
        this.trigger("drag"),
        this.drag.startTime = (new Date).getTime(),
        this.speed(0),
        this.state.isTouch = !0,
        this.state.isScrolling = !1,
        this.state.isSwiping = !1,
        this.drag.distance = 0,
        r = o(n).x,
        a = o(n).y,
        this.drag.offsetX = this.$stage.position().left,
        this.drag.offsetY = this.$stage.position().top,
        this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin),
        this.state.inMotion && this.support3d)
            h = this.getTransformProperty(),
            this.drag.offsetX = h,
            this.animate(h),
            this.state.inMotion = !0;
        else if (this.state.inMotion && !this.support3d)
            return this.state.inMotion = !1,
            !1;
        this.drag.startX = r - this.drag.offsetX,
        this.drag.startY = a - this.drag.offsetY,
        this.drag.start = r - this.drag.startX,
        this.drag.targetEl = n.target || n.srcElement,
        this.drag.updatedX = this.drag.start,
        ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1),
        t(i).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", t.proxy(function(t) {
            this.eventsRouter(t)
        }, this))
    }
    ,
    n.prototype.onDragMove = function(t) {
        var i, n, r, a, h, l;
        this.state.isTouch && (this.state.isScrolling || (i = t.originalEvent || t || e.event,
        n = o(i).x,
        r = o(i).y,
        this.drag.currentX = n - this.drag.startX,
        this.drag.currentY = r - this.drag.startY,
        this.drag.distance = this.drag.currentX - this.drag.offsetX,
        this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"),
        this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (a = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()),
        h = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()),
        l = this.settings.pullDrag ? this.drag.distance / 5 : 0,
        this.drag.currentX = Math.max(Math.min(this.drag.currentX, a + l), h + l)),
        (this.drag.distance > 8 || this.drag.distance < -8) && (i.preventDefault !== s ? i.preventDefault() : i.returnValue = !1,
        this.state.isSwiping = !0),
        this.drag.updatedX = this.drag.currentX,
        (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0,
        this.drag.updatedX = this.drag.start),
        this.animate(this.drag.updatedX)))
    }
    ,
    n.prototype.onDragEnd = function(e) {
        var s, n, o;
        if (this.state.isTouch) {
            if ("mouseup" === e.type && this.$stage.removeClass("owl-grab"),
            this.trigger("dragged"),
            this.drag.targetEl.removeAttribute("draggable"),
            this.state.isTouch = !1,
            this.state.isScrolling = !1,
            this.state.isSwiping = !1,
            0 === this.drag.distance && this.state.inMotion !== !0)
                return this.state.inMotion = !1,
                !1;
            this.drag.endTime = (new Date).getTime(),
            s = this.drag.endTime - this.drag.startTime,
            n = Math.abs(this.drag.distance),
            (n > 3 || s > 300) && this.removeClick(this.drag.targetEl),
            o = this.closest(this.drag.updatedX),
            this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
            this.current(o),
            this.invalidate("position"),
            this.update(),
            this.settings.pullDrag || this.drag.updatedX !== this.coordinates(o) || this.transitionEnd(),
            this.drag.distance = 0,
            t(i).off(".owl.dragEvents")
        }
    }
    ,
    n.prototype.removeClick = function(i) {
        this.drag.targetEl = i,
        t(i).on("click.preventClick", this.e._preventClick),
        e.setTimeout(function() {
            t(i).off("click.preventClick")
        }, 300)
    }
    ,
    n.prototype.preventClick = function(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1,
        e.stopPropagation && e.stopPropagation(),
        t(e.target).off("click.preventClick")
    }
    ,
    n.prototype.getTransformProperty = function() {
        var t, i;
        return t = e.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"),
        t = t.replace(/matrix(3d)?\(|\)/g, "").split(","),
        i = 16 === t.length,
        i !== !0 ? t[4] : t[12]
    }
    ,
    n.prototype.closest = function(e) {
        var i = -1
          , s = 30
          , n = this.width()
          , o = this.coordinates();
        return this.settings.freeDrag || t.each(o, t.proxy(function(t, r) {
            return e > r - s && r + s > e ? i = t : this.op(e, "<", r) && this.op(e, ">", o[t + 1] || r - n) && (i = "left" === this.state.direction ? t + 1 : t),
            -1 === i
        }, this)),
        this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? i = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (i = e = this.maximum())),
        i
    }
    ,
    n.prototype.animate = function(e) {
        this.trigger("translate"),
        this.state.inMotion = this.speed() > 0,
        this.support3d ? this.$stage.css({
            transform: "translate3d(" + e + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({
            left: e + "px"
        }) : this.$stage.animate({
            left: e
        }, this.speed() / 1e3, this.settings.fallbackEasing, t.proxy(function() {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }
    ,
    n.prototype.current = function(t) {
        if (t === s)
            return this._current;
        if (0 === this._items.length)
            return s;
        if (t = this.normalize(t),
        this._current !== t) {
            var e = this.trigger("change", {
                property: {
                    name: "position",
                    value: t
                }
            });
            e.data !== s && (t = this.normalize(e.data)),
            this._current = t,
            this.invalidate("position"),
            this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }
    ,
    n.prototype.invalidate = function(t) {
        this._invalidated[t] = !0
    }
    ,
    n.prototype.reset = function(t) {
        t = this.normalize(t),
        t !== s && (this._speed = 0,
        this._current = t,
        this.suppress(["translate", "translated"]),
        this.animate(this.coordinates(t)),
        this.release(["translate", "translated"]))
    }
    ,
    n.prototype.normalize = function(e, i) {
        var n = i ? this._items.length : this._items.length + this._clones.length;
        return !t.isNumeric(e) || 1 > n ? s : e = this._clones.length ? (e % n + n) % n : Math.max(this.minimum(i), Math.min(this.maximum(i), e))
    }
    ,
    n.prototype.relative = function(t) {
        return t = this.normalize(t),
        t -= this._clones.length / 2,
        this.normalize(t, !0)
    }
    ,
    n.prototype.maximum = function(t) {
        var e, i, s, n = 0, o = this.settings;
        if (t)
            return this._items.length - 1;
        if (!o.loop && o.center)
            e = this._items.length - 1;
        else if (o.loop || o.center)
            if (o.loop || o.center)
                e = this._items.length + o.items;
            else {
                if (!o.autoWidth && !o.merge)
                    throw "Can not detect maximum absolute position.";
                for (revert = o.rtl ? 1 : -1,
                i = this.$stage.width() - this.$element.width(); (s = this.coordinates(n)) && !(s * revert >= i); )
                    e = ++n
            }
        else
            e = this._items.length - o.items;
        return e
    }
    ,
    n.prototype.minimum = function(t) {
        return t ? 0 : this._clones.length / 2
    }
    ,
    n.prototype.items = function(t) {
        return t === s ? this._items.slice() : (t = this.normalize(t, !0),
        this._items[t])
    }
    ,
    n.prototype.mergers = function(t) {
        return t === s ? this._mergers.slice() : (t = this.normalize(t, !0),
        this._mergers[t])
    }
    ,
    n.prototype.clones = function(e) {
        var i = this._clones.length / 2
          , n = i + this._items.length
          , o = function(t) {
            return t % 2 === 0 ? n + t / 2 : i - (t + 1) / 2
        };
        return e === s ? t.map(this._clones, function(t, e) {
            return o(e)
        }) : t.map(this._clones, function(t, i) {
            return t === e ? o(i) : null
        })
    }
    ,
    n.prototype.speed = function(t) {
        return t !== s && (this._speed = t),
        this._speed
    }
    ,
    n.prototype.coordinates = function(e) {
        var i = null;
        return e === s ? t.map(this._coordinates, t.proxy(function(t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (i = this._coordinates[e],
        i += (this.width() - i + (this._coordinates[e - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : i = this._coordinates[e - 1] || 0,
        i)
    }
    ,
    n.prototype.duration = function(t, e, i) {
        return Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    }
    ,
    n.prototype.to = function(i, s) {
        if (this.settings.loop) {
            var n = i - this.relative(this.current())
              , o = this.current()
              , r = this.current()
              , a = this.current() + n
              , h = 0 > r - a ? !0 : !1
              , l = this._clones.length + this._items.length;
            a < this.settings.items && h === !1 ? (o = r + this._items.length,
            this.reset(o)) : a >= l - this.settings.items && h === !0 && (o = r - this._items.length,
            this.reset(o)),
            e.clearTimeout(this.e._goToLoop),
            this.e._goToLoop = e.setTimeout(t.proxy(function() {
                this.speed(this.duration(this.current(), o + n, s)),
                this.current(o + n),
                this.update()
            }, this), 30)
        } else
            this.speed(this.duration(this.current(), i, s)),
            this.current(i),
            this.update()
    }
    ,
    n.prototype.next = function(t) {
        t = t || !1,
        this.to(this.relative(this.current()) + 1, t)
    }
    ,
    n.prototype.prev = function(t) {
        t = t || !1,
        this.to(this.relative(this.current()) - 1, t)
    }
    ,
    n.prototype.transitionEnd = function(t) {
        return t !== s && (t.stopPropagation(),
        (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1,
        void this.trigger("translated"))
    }
    ,
    n.prototype.viewport = function() {
        var s;
        if (this.options.responsiveBaseElement !== e)
            s = t(this.options.responsiveBaseElement).width();
        else if (e.innerWidth)
            s = e.innerWidth;
        else {
            if (!i.documentElement || !i.documentElement.clientWidth)
                throw "Can not detect viewport width.";
            s = i.documentElement.clientWidth
        }
        return s
    }
    ,
    n.prototype.replace = function(e) {
        this.$stage.empty(),
        this._items = [],
        e && (e = e instanceof jQuery ? e : t(e)),
        this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)),
        e.filter(function() {
            return 1 === this.nodeType
        }).each(t.proxy(function(t, e) {
            e = this.prepare(e),
            this.$stage.append(e),
            this._items.push(e),
            this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)),
        this.reset(t.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
        this.invalidate("items")
    }
    ,
    n.prototype.add = function(t, e) {
        e = e === s ? this._items.length : this.normalize(e, !0),
        this.trigger("add", {
            content: t,
            position: e
        }),
        0 === this._items.length || e === this._items.length ? (this.$stage.append(t),
        this._items.push(t),
        this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t),
        this._items.splice(e, 0, t),
        this._mergers.splice(e, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)),
        this.invalidate("items"),
        this.trigger("added", {
            content: t,
            position: e
        })
    }
    ,
    n.prototype.remove = function(t) {
        t = this.normalize(t, !0),
        t !== s && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }),
        this._items[t].remove(),
        this._items.splice(t, 1),
        this._mergers.splice(t, 1),
        this.invalidate("items"),
        this.trigger("removed", {
            content: null,
            position: t
        }))
    }
    ,
    n.prototype.addTriggerableEvents = function() {
        var e = t.proxy(function(e, i) {
            return t.proxy(function(t) {
                t.relatedTarget !== this && (this.suppress([i]),
                e.apply(this, [].slice.call(arguments, 1)),
                this.release([i]))
            }, this)
        }, this);
        t.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, t.proxy(function(t, i) {
            this.$element.on(t + ".owl.carousel", e(i, t + ".owl.carousel"))
        }, this))
    }
    ,
    n.prototype.watchVisibility = function() {
        function i(t) {
            return t.offsetWidth > 0 && t.offsetHeight > 0
        }
        function s() {
            i(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"),
            this.refresh(),
            e.clearInterval(this.e._checkVisibile))
        }
        i(this.$element.get(0)) || (this.$element.addClass("owl-hidden"),
        e.clearInterval(this.e._checkVisibile),
        this.e._checkVisibile = e.setInterval(t.proxy(s, this), 500))
    }
    ,
    n.prototype.preloadAutoWidthImages = function(e) {
        var i, s, n, o;
        i = 0,
        s = this,
        e.each(function(r, a) {
            n = t(a),
            o = new Image,
            o.onload = function() {
                i++,
                n.attr("src", o.src),
                n.css("opacity", 1),
                i >= e.length && (s.state.imagesLoaded = !0,
                s.initialize())
            }
            ,
            o.src = n.attr("src") || n.attr("data-src") || n.attr("data-src-retina")
        })
    }
    ,
    n.prototype.destroy = function() {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass),
        this.settings.responsive !== !1 && t(e).off("resize.owl.carousel"),
        this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var s in this._plugins)
            this._plugins[s].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"),
        t(i).off(".owl.dragEvents"),
        this.$stage.get(0).onselectstart = function() {}
        ,
        this.$stage.off("dragstart", function() {
            return !1
        })),
        this.$element.off(".owl"),
        this.$stage.children(".cloned").remove(),
        this.e = null,
        this.$element.removeData("owlCarousel"),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.unwrap()
    }
    ,
    n.prototype.op = function(t, e, i) {
        var s = this.settings.rtl;
        switch (e) {
        case "<":
            return s ? t > i : i > t;
        case ">":
            return s ? i > t : t > i;
        case ">=":
            return s ? i >= t : t >= i;
        case "<=":
            return s ? t >= i : i >= t
        }
    }
    ,
    n.prototype.on = function(t, e, i, s) {
        t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
    }
    ,
    n.prototype.off = function(t, e, i, s) {
        t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
    }
    ,
    n.prototype.trigger = function(e, i, s) {
        var n = {
            item: {
                count: this._items.length,
                index: this.current()
            }
        }
          , o = t.camelCase(t.grep(["on", e, s], function(t) {
            return t
        }).join("-").toLowerCase())
          , r = t.Event([e, "owl", s || "carousel"].join(".").toLowerCase(), t.extend({
            relatedTarget: this
        }, n, i));
        return this._supress[e] || (t.each(this._plugins, function(t, e) {
            e.onTrigger && e.onTrigger(r)
        }),
        this.$element.trigger(r),
        this.settings && "function" == typeof this.settings[o] && this.settings[o].apply(this, r)),
        r
    }
    ,
    n.prototype.suppress = function(e) {
        t.each(e, t.proxy(function(t, e) {
            this._supress[e] = !0
        }, this))
    }
    ,
    n.prototype.release = function(e) {
        t.each(e, t.proxy(function(t, e) {
            delete this._supress[e]
        }, this))
    }
    ,
    n.prototype.browserSupport = function() {
        if (this.support3d = l(),
        this.support3d) {
            this.transformVendor = h();
            var t = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = t[a()],
            this.vendorName = this.transformVendor.replace(/Transform/i, ""),
            this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = e.orientation
    }
    ,
    t.fn.owlCarousel = function(e) {
        return this.each(function() {
            t(this).data("owlCarousel") || t(this).data("owlCarousel", new n(this,e))
        })
    }
    ,
    t.fn.owlCarousel.Constructor = n
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
    var i = function(e) {
        this._core = e,
        this._loaded = [],
        this._handlers = {
            "initialized.owl.carousel change.owl.carousel": t.proxy(function(e) {
                if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
                    for (var i = this._core.settings, s = i.center && Math.ceil(i.items / 2) || i.items, n = i.center && -1 * s || 0, o = (e.property && e.property.value || this._core.current()) + n, r = this._core.clones().length, a = t.proxy(function(t, e) {
                        this.load(e)
                    }, this); n++ < s; )
                        this.load(r / 2 + this._core.relative(o)),
                        r && t.each(this._core.clones(this._core.relative(o++)), a)
            }, this)
        },
        this._core.options = t.extend({}, i.Defaults, this._core.options),
        this._core.$element.on(this._handlers)
    };
    i.Defaults = {
        lazyLoad: !1
    },
    i.prototype.load = function(i) {
        var s = this._core.$stage.children().eq(i)
          , n = s && s.find(".owl-lazy");
        !n || t.inArray(s.get(0), this._loaded) > -1 || (n.each(t.proxy(function(i, s) {
            var n, o = t(s), r = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
            this._core.trigger("load", {
                element: o,
                url: r
            }, "lazy"),
            o.is("img") ? o.one("load.owl.lazy", t.proxy(function() {
                o.css("opacity", 1),
                this._core.trigger("loaded", {
                    element: o,
                    url: r
                }, "lazy")
            }, this)).attr("src", r) : (n = new Image,
            n.onload = t.proxy(function() {
                o.css({
                    "background-image": "url(" + r + ")",
                    opacity: "1"
                }),
                this._core.trigger("loaded", {
                    element: o,
                    url: r
                }, "lazy")
            }, this),
            n.src = r)
        }, this)),
        this._loaded.push(s.get(0)))
    }
    ,
    i.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers)
            this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null)
    }
    ,
    t.fn.owlCarousel.Constructor.Plugins.Lazy = i
}(window.Zepto || window.jQuery, window, document),
function(t) {
    var e = function(i) {
        this._core = i,
        this._handlers = {
            "initialized.owl.carousel": t.proxy(function() {
                this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                this._core.settings.autoHeight && "position" == t.property.name && this.update()
            }, this),
            "loaded.owl.lazy": t.proxy(function(t) {
                this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
            }, this)
        },
        this._core.options = t.extend({}, e.Defaults, this._core.options),
        this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    },
    e.prototype.update = function() {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }
    ,
    e.prototype.destroy = function() {
        var t, e;
        for (t in this._handlers)
            this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null)
    }
    ,
    t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(t, e, i) {
    var s = function(e) {
        this._core = e,
        this._videos = {},
        this._playing = null,
        this._fullscreen = !1,
        this._handlers = {
            "resize.owl.carousel": t.proxy(function(t) {
                this._core.settings.video && !this.isInFullScreen() && t.preventDefault()
            }, this),
            "refresh.owl.carousel changed.owl.carousel": t.proxy(function() {
                this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": t.proxy(function(e) {
                var i = t(e.content).find(".owl-video");
                i.length && (i.css("display", "none"),
                this.fetch(i, t(e.content)))
            }, this)
        },
        this._core.options = t.extend({}, s.Defaults, this._core.options),
        this._core.$element.on(this._handlers),
        this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
            this.play(t)
        }, this))
    };
    s.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    },
    s.prototype.fetch = function(t, e) {
        var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube"
          , s = t.attr("data-vimeo-id") || t.attr("data-youtube-id")
          , n = t.attr("data-width") || this._core.settings.videoWidth
          , o = t.attr("data-height") || this._core.settings.videoHeight
          , r = t.attr("href");
        if (!r)
            throw new Error("Missing video URL.");
        if (s = r.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
        s[3].indexOf("youtu") > -1)
            i = "youtube";
        else {
            if (!(s[3].indexOf("vimeo") > -1))
                throw new Error("Video URL not supported.");
            i = "vimeo"
        }
        s = s[6],
        this._videos[r] = {
            type: i,
            id: s,
            width: n,
            height: o
        },
        e.attr("data-video", r),
        this.thumbnail(t, this._videos[r])
    }
    ,
    s.prototype.thumbnail = function(e, i) {
        var s, n, o, r = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "", a = e.find("img"), h = "src", l = "", d = this._core.settings, c = function(t) {
            n = '<div class="owl-video-play-icon"></div>',
            s = d.lazyLoad ? '<div class="owl-video-tn ' + l + '" ' + h + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>',
            e.after(s),
            e.after(n)
        };
        return e.wrap('<div class="owl-video-wrapper"' + r + "></div>"),
        this._core.settings.lazyLoad && (h = "data-src",
        l = "owl-lazy"),
        a.length ? (c(a.attr(h)),
        a.remove(),
        !1) : void ("youtube" === i.type ? (o = "http://img.youtube.com/vi/" + i.id + "/hqdefault.jpg",
        c(o)) : "vimeo" === i.type && t.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + i.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(t) {
                o = t[0].thumbnail_large,
                c(o)
            }
        }))
    }
    ,
    s.prototype.stop = function() {
        this._core.trigger("stop", null, "video"),
        this._playing.find(".owl-video-frame").remove(),
        this._playing.removeClass("owl-video-playing"),
        this._playing = null
    }
    ,
    s.prototype.play = function(e) {
        this._core.trigger("play", null, "video"),
        this._playing && this.stop();
        var i, s, n = t(e.target || e.srcElement), o = n.closest("." + this._core.settings.itemClass), r = this._videos[o.attr("data-video")], a = r.width || "100%", h = r.height || this._core.$stage.height();
        "youtube" === r.type ? i = '<iframe width="' + a + '" height="' + h + '" src="http://www.youtube.com/embed/' + r.id + "?autoplay=1&v=" + r.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === r.type && (i = '<iframe src="http://player.vimeo.com/video/' + r.id + '?autoplay=1" width="' + a + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
        o.addClass("owl-video-playing"),
        this._playing = o,
        s = t('<div style="height:' + h + "px; width:" + a + 'px" class="owl-video-frame">' + i + "</div>"),
        n.after(s)
    }
    ,
    s.prototype.isInFullScreen = function() {
        var s = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
        return s && t(s).parent().hasClass("owl-video-frame") && (this._core.speed(0),
        this._fullscreen = !0),
        s && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1,
        !1) : this._playing && this._core.state.orientation !== e.orientation ? (this._core.state.orientation = e.orientation,
        !1) : !0
    }
    ,
    s.prototype.destroy = function() {
        var t, e;
        this._core.$element.off("click.owl.video");
        for (t in this._handlers)
            this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null)
    }
    ,
    t.fn.owlCarousel.Constructor.Plugins.Video = s
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this.core = e,
        this.core.options = t.extend({}, n.Defaults, this.core.options),
        this.swapping = !0,
        this.previous = s,
        this.next = s,
        this.handlers = {
            "change.owl.carousel": t.proxy(function(t) {
                "position" == t.property.name && (this.previous = this.core.current(),
                this.next = t.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
                this.swapping = "translated" == t.type
            }, this),
            "translate.owl.carousel": t.proxy(function() {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        },
        this.core.$element.on(this.handlers)
    };
    n.Defaults = {
        animateOut: !1,
        animateIn: !1
    },
    n.prototype.swap = function() {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var e, i = t.proxy(this.clear, this), s = this.core.$stage.children().eq(this.previous), n = this.core.$stage.children().eq(this.next), o = this.core.settings.animateIn, r = this.core.settings.animateOut;
            this.core.current() !== this.previous && (r && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next),
            s.css({
                left: e + "px"
            }).addClass("animated owl-animated-out").addClass(r).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i)),
            o && n.addClass("animated owl-animated-in").addClass(o).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i))
        }
    }
    ,
    n.prototype.clear = function(e) {
        t(e.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
        this.core.transitionEnd()
    }
    ,
    n.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers)
            this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null)
    }
    ,
    t.fn.owlCarousel.Constructor.Plugins.Animate = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i) {
    var s = function(e) {
        this.core = e,
        this.core.options = t.extend({}, s.Defaults, this.core.options),
        this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": t.proxy(function() {
                this.autoplay()
            }, this),
            "play.owl.autoplay": t.proxy(function(t, e, i) {
                this.play(e, i)
            }, this),
            "stop.owl.autoplay": t.proxy(function() {
                this.stop()
            }, this),
            "mouseover.owl.autoplay": t.proxy(function() {
                this.core.settings.autoplayHoverPause && this.pause()
            }, this),
            "mouseleave.owl.autoplay": t.proxy(function() {
                this.core.settings.autoplayHoverPause && this.autoplay()
            }, this)
        },
        this.core.$element.on(this.handlers)
    };
    s.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    },
    s.prototype.autoplay = function() {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (e.clearInterval(this.interval),
        this.interval = e.setInterval(t.proxy(function() {
            this.play()
        }, this), this.core.settings.autoplayTimeout)) : e.clearInterval(this.interval)
    }
    ,
    s.prototype.play = function() {
        return i.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void e.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    }
    ,
    s.prototype.stop = function() {
        e.clearInterval(this.interval)
    }
    ,
    s.prototype.pause = function() {
        e.clearInterval(this.interval)
    }
    ,
    s.prototype.destroy = function() {
        var t, i;
        e.clearInterval(this.interval);
        for (t in this.handlers)
            this.core.$element.off(t, this.handlers[t]);
        for (i in Object.getOwnPropertyNames(this))
            "function" != typeof this[i] && (this[i] = null)
    }
    ,
    t.fn.owlCarousel.Constructor.Plugins.autoplay = s
}(window.Zepto || window.jQuery, window, document),
function(t) {
    "use strict";
    var e = function(i) {
        this._core = i,
        this._initialized = !1,
        this._pages = [],
        this._controls = {},
        this._templates = [],
        this.$element = this._core.$element,
        this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        },
        this._handlers = {
            "prepared.owl.carousel": t.proxy(function(e) {
                this._core.settings.dotsData && this._templates.push(t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "add.owl.carousel": t.proxy(function(e) {
                this._core.settings.dotsData && this._templates.splice(e.position, 0, t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "remove.owl.carousel prepared.owl.carousel": t.proxy(function(t) {
                this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this),
            "change.owl.carousel": t.proxy(function(t) {
                if ("position" == t.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var e = this._core.current()
                      , i = this._core.maximum()
                      , s = this._core.minimum();
                    t.data = t.property.value > i ? e >= i ? s : i : t.property.value < s ? i : t.property.value
                }
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                "position" == t.property.name && this.draw()
            }, this),
            "refreshed.owl.carousel": t.proxy(function() {
                this._initialized || (this.initialize(),
                this._initialized = !0),
                this._core.trigger("refresh", null, "navigation"),
                this.update(),
                this.draw(),
                this._core.trigger("refreshed", null, "navigation")
            }, this)
        },
        this._core.options = t.extend({}, e.Defaults, this._core.options),
        this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    },
    e.prototype.initialize = function() {
        var e, i, s = this._core.settings;
        s.dotsData || (this._templates = [t("<div>").addClass(s.dotClass).append(t("<span>")).prop("outerHTML")]),
        s.navContainer && s.dotsContainer || (this._controls.$container = t("<div>").addClass(s.controlsClass).appendTo(this.$element)),
        this._controls.$indicators = s.dotsContainer ? t(s.dotsContainer) : t("<div>").hide().addClass(s.dotsClass).appendTo(this._controls.$container),
        this._controls.$indicators.on("click", "div", t.proxy(function(e) {
            var i = t(e.target).parent().is(this._controls.$indicators) ? t(e.target).index() : t(e.target).parent().index();
            e.preventDefault(),
            this.to(i, s.dotsSpeed)
        }, this)),
        e = s.navContainer ? t(s.navContainer) : t("<div>").addClass(s.navContainerClass).prependTo(this._controls.$container),
        this._controls.$next = t("<" + s.navElement + ">"),
        this._controls.$previous = this._controls.$next.clone(),
        this._controls.$previous.addClass(s.navClass[0]).html(s.navText[0]).hide().prependTo(e).on("click", t.proxy(function() {
            this.prev(s.navSpeed)
        }, this)),
        this._controls.$next.addClass(s.navClass[1]).html(s.navText[1]).hide().appendTo(e).on("click", t.proxy(function() {
            this.next(s.navSpeed)
        }, this));
        for (i in this._overrides)
            this._core[i] = t.proxy(this[i], this)
    }
    ,
    e.prototype.destroy = function() {
        var t, e, i, s;
        for (t in this._handlers)
            this.$element.off(t, this._handlers[t]);
        for (e in this._controls)
            this._controls[e].remove();
        for (s in this.overides)
            this._core[s] = this._overrides[s];
        for (i in Object.getOwnPropertyNames(this))
            "function" != typeof this[i] && (this[i] = null)
    }
    ,
    e.prototype.update = function() {
        var t, e, i, s = this._core.settings, n = this._core.clones().length / 2, o = n + this._core.items().length, r = s.center || s.autoWidth || s.dotData ? 1 : s.dotsEach || s.items;
        if ("page" !== s.slideBy && (s.slideBy = Math.min(s.slideBy, s.items)),
        s.dots || "page" == s.slideBy)
            for (this._pages = [],
            t = n,
            e = 0,
            i = 0; o > t; t++)
                (e >= r || 0 === e) && (this._pages.push({
                    start: t - n,
                    end: t - n + r - 1
                }),
                e = 0,
                ++i),
                e += this._core.mergers(this._core.relative(t))
    }
    ,
    e.prototype.draw = function() {
        var e, i, s = "", n = this._core.settings, o = (this._core.$stage.children(),
        this._core.relative(this._core.current()));
        if (!n.nav || n.loop || n.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= o),
        this._controls.$next.toggleClass("disabled", o >= this._core.maximum())),
        this._controls.$previous.toggle(n.nav),
        this._controls.$next.toggle(n.nav),
        n.dots) {
            if (e = this._pages.length - this._controls.$indicators.children().length,
            n.dotData && 0 !== e) {
                for (i = 0; i < this._controls.$indicators.children().length; i++)
                    s += this._templates[this._core.relative(i)];
                this._controls.$indicators.html(s)
            } else
                e > 0 ? (s = new Array(e + 1).join(this._templates[0]),
                this._controls.$indicators.append(s)) : 0 > e && this._controls.$indicators.children().slice(e).remove();
            this._controls.$indicators.find(".active").removeClass("active"),
            this._controls.$indicators.children().eq(t.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(n.dots)
    }
    ,
    e.prototype.onTrigger = function(e) {
        var i = this._core.settings;
        e.page = {
            index: t.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: i && (i.center || i.autoWidth || i.dotData ? 1 : i.dotsEach || i.items)
        }
    }
    ,
    e.prototype.current = function() {
        var e = this._core.relative(this._core.current());
        return t.grep(this._pages, function(t) {
            return t.start <= e && t.end >= e
        }).pop()
    }
    ,
    e.prototype.getPosition = function(e) {
        var i, s, n = this._core.settings;
        return "page" == n.slideBy ? (i = t.inArray(this.current(), this._pages),
        s = this._pages.length,
        e ? ++i : --i,
        i = this._pages[(i % s + s) % s].start) : (i = this._core.relative(this._core.current()),
        s = this._core.items().length,
        e ? i += n.slideBy : i -= n.slideBy),
        i
    }
    ,
    e.prototype.next = function(e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
    }
    ,
    e.prototype.prev = function(e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
    }
    ,
    e.prototype.to = function(e, i, s) {
        var n;
        s ? t.proxy(this._overrides.to, this._core)(e, i) : (n = this._pages.length,
        t.proxy(this._overrides.to, this._core)(this._pages[(e % n + n) % n].start, i))
    }
    ,
    t.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
    "use strict";
    var i = function(s) {
        this._core = s,
        this._hashes = {},
        this.$element = this._core.$element,
        this._handlers = {
            "initialized.owl.carousel": t.proxy(function() {
                "URLHash" == this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": t.proxy(function(e) {
                var i = t(e.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[i] = e.content
            }, this)
        },
        this._core.options = t.extend({}, i.Defaults, this._core.options),
        this.$element.on(this._handlers),
        t(e).on("hashchange.owl.navigation", t.proxy(function() {
            var t = e.location.hash.substring(1)
              , i = this._core.$stage.children()
              , s = this._hashes[t] && i.index(this._hashes[t]) || 0;
            return t ? void this._core.to(s, !1, !0) : !1
        }, this))
    };
    i.Defaults = {
        URLhashListener: !1
    },
    i.prototype.destroy = function() {
        var i, s;
        t(e).off("hashchange.owl.navigation");
        for (i in this._handlers)
            this._core.$element.off(i, this._handlers[i]);
        for (s in Object.getOwnPropertyNames(this))
            "function" != typeof this[s] && (this[s] = null)
    }
    ,
    t.fn.owlCarousel.Constructor.Plugins.Hash = i
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    i.swipebox = function(n, o) {
        var r, a, h = {
            useCSS: !0,
            useSVG: !0,
            initialIndexOnArray: 0,
            removeBarsOnMobile: !0,
            hideCloseButtonOnMobile: !1,
            hideBarsDelay: 3e3,
            videoMaxWidth: 1140,
            vimeoColor: "cccccc",
            beforeOpen: null,
            afterOpen: null,
            afterClose: null,
            afterMedia: null,
            nextSlide: null,
            prevSlide: null,
            loopAtEnd: !1,
            autoplayVideos: !1,
            queryStringData: {},
            toggleClassOnLoad: ""
        }, l = this, d = [], c = n.selector, p = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i), u = null !== p || e.createTouch !== s || "ontouchstart"in t || "onmsgesturechange"in t || navigator.msMaxTouchPoints, g = !!e.createElementNS && !!e.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, m = t.innerWidth ? t.innerWidth : i(t).width(), f = t.innerHeight ? t.innerHeight : i(t).height(), v = 0, w = '<div id="swipebox-overlay">					<div id="swipebox-container">						<div id="swipebox-slider"></div>						<div id="swipebox-top-bar">							<div id="swipebox-title"></div>						</div>						<div id="swipebox-bottom-bar">							<div id="swipebox-arrows">								<a id="swipebox-prev"></a>								<a id="swipebox-next"></a>							</div>						</div>						<a id="swipebox-close"></a>					</div>			</div>';
        l.settings = {},
        i.swipebox.close = function() {
            r.closeSlide()
        }
        ,
        i.swipebox.extend = function() {
            return r
        }
        ,
        l.init = function() {
            l.settings = i.extend({}, h, o),
            i.isArray(n) ? (d = n,
            r.target = i(t),
            r.init(l.settings.initialIndexOnArray)) : i(e).on("click", c, function(t) {
                if ("slide current" === t.target.parentNode.className)
                    return !1;
                i.isArray(n) || (r.destroy(),
                a = i(c),
                r.actions()),
                d = [];
                var e, s, o;
                o || (s = "data-rel",
                o = i(this).attr(s)),
                o || (s = "rel",
                o = i(this).attr(s)),
                a = o && "" !== o && "nofollow" !== o ? i(c).filter("[" + s + '="' + o + '"]') : i(c),
                a.each(function() {
                    var t = null
                      , e = null;
                    i(this).attr("title") && (t = i(this).attr("title")),
                    i(this).attr("href") && (e = i(this).attr("href")),
                    d.push({
                        href: e,
                        title: t
                    })
                }),
                e = a.index(i(this)),
                t.preventDefault(),
                t.stopPropagation(),
                r.target = i(t.target),
                r.init(e)
            })
        }
        ,
        r = {
            init: function(t) {
                l.settings.beforeOpen && l.settings.beforeOpen(),
                this.target.trigger("swipebox-start"),
                i.swipebox.isOpen = !0,
                this.build(),
                this.openSlide(t),
                this.openMedia(t),
                this.preloadMedia(t + 1),
                this.preloadMedia(t - 1),
                l.settings.afterOpen && l.settings.afterOpen(t)
            },
            build: function() {
                var t, e = this;
                i("body").append(w),
                g && l.settings.useSVG === !0 && (t = i("#swipebox-close").css("background-image"),
                t = t.replace("png", "svg"),
                i("#swipebox-prev, #swipebox-next, #swipebox-close").css({
                    "background-image": t
                })),
                p && l.settings.removeBarsOnMobile && i("#swipebox-bottom-bar, #swipebox-top-bar").remove(),
                i.each(d, function() {
                    i("#swipebox-slider").append('<div class="slide"></div>')
                }),
                e.setDim(),
                e.actions(),
                u && e.gesture(),
                e.keyboard(),
                e.animBars(),
                e.resize()
            },
            setDim: function() {
                var e, s, n = {};
                "onorientationchange"in t ? t.addEventListener("orientationchange", function() {
                    0 === t.orientation ? (e = m,
                    s = f) : (90 === t.orientation || -90 === t.orientation) && (e = f,
                    s = m)
                }, !1) : (e = t.innerWidth ? t.innerWidth : i(t).width(),
                s = t.innerHeight ? t.innerHeight : i(t).height()),
                n = {
                    width: e,
                    height: s
                },
                i("#swipebox-overlay").css(n)
            },
            resize: function() {
                var e = this;
                i(t).resize(function() {
                    e.setDim()
                }).resize()
            },
            supportTransition: function() {
                var t, i = "transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(" ");
                for (t = 0; t < i.length; t++)
                    if (e.createElement("div").style[i[t]] !== s)
                        return i[t];
                return !1
            },
            doCssTrans: function() {
                return l.settings.useCSS && this.supportTransition() ? !0 : void 0
            },
            gesture: function() {
                var t, e, s, n, o, r, a = this, h = !1, l = !1, c = 10, p = 50, u = {}, g = {}, f = i("#swipebox-top-bar, #swipebox-bottom-bar"), w = i("#swipebox-slider");
                f.addClass("visible-bars"),
                a.setTimeout(),
                i("body").bind("touchstart", function(a) {
                    return i(this).addClass("touching"),
                    t = i("#swipebox-slider .slide").index(i("#swipebox-slider .slide.current")),
                    g = a.originalEvent.targetTouches[0],
                    u.pageX = a.originalEvent.targetTouches[0].pageX,
                    u.pageY = a.originalEvent.targetTouches[0].pageY,
                    i("#swipebox-slider").css({
                        "-webkit-transform": "translate3d(" + v + "%, 0, 0)",
                        transform: "translate3d(" + v + "%, 0, 0)"
                    }),
                    i(".touching").bind("touchmove", function(a) {
                        if (a.preventDefault(),
                        a.stopPropagation(),
                        g = a.originalEvent.targetTouches[0],
                        !l && (o = s,
                        s = g.pageY - u.pageY,
                        Math.abs(s) >= p || h)) {
                            var f = .75 - Math.abs(s) / w.height();
                            w.css({
                                top: s + "px"
                            }),
                            w.css({
                                opacity: f
                            }),
                            h = !0
                        }
                        n = e,
                        e = g.pageX - u.pageX,
                        r = 100 * e / m,
                        !l && !h && Math.abs(e) >= c && (i("#swipebox-slider").css({
                            "-webkit-transition": "",
                            transition: ""
                        }),
                        l = !0),
                        l && (e > 0 ? 0 === t ? i("#swipebox-overlay").addClass("leftSpringTouch") : (i("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"),
                        i("#swipebox-slider").css({
                            "-webkit-transform": "translate3d(" + (v + r) + "%, 0, 0)",
                            transform: "translate3d(" + (v + r) + "%, 0, 0)"
                        })) : 0 > e && (d.length === t + 1 ? i("#swipebox-overlay").addClass("rightSpringTouch") : (i("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"),
                        i("#swipebox-slider").css({
                            "-webkit-transform": "translate3d(" + (v + r) + "%, 0, 0)",
                            transform: "translate3d(" + (v + r) + "%, 0, 0)"
                        }))))
                    }),
                    !1
                }).bind("touchend", function(t) {
                    if (t.preventDefault(),
                    t.stopPropagation(),
                    i("#swipebox-slider").css({
                        "-webkit-transition": "-webkit-transform 0.4s ease",
                        transition: "transform 0.4s ease"
                    }),
                    s = g.pageY - u.pageY,
                    e = g.pageX - u.pageX,
                    r = 100 * e / m,
                    h)
                        if (h = !1,
                        Math.abs(s) >= 2 * p && Math.abs(s) > Math.abs(o)) {
                            var d = s > 0 ? w.height() : -w.height();
                            w.animate({
                                top: d + "px",
                                opacity: 0
                            }, 300, function() {
                                a.closeSlide()
                            })
                        } else
                            w.animate({
                                top: 0,
                                opacity: 1
                            }, 300);
                    else
                        l ? (l = !1,
                        e >= c && e >= n ? a.getPrev() : -c >= e && n >= e && a.getNext()) : f.hasClass("visible-bars") ? (a.clearTimeout(),
                        a.hideBars()) : (a.showBars(),
                        a.setTimeout());
                    i("#swipebox-slider").css({
                        "-webkit-transform": "translate3d(" + v + "%, 0, 0)",
                        transform: "translate3d(" + v + "%, 0, 0)"
                    }),
                    i("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"),
                    i(".touching").off("touchmove").removeClass("touching")
                })
            },
            setTimeout: function() {
                if (l.settings.hideBarsDelay > 0) {
                    var e = this;
                    e.clearTimeout(),
                    e.timeout = t.setTimeout(function() {
                        e.hideBars()
                    }, l.settings.hideBarsDelay)
                }
            },
            clearTimeout: function() {
                t.clearTimeout(this.timeout),
                this.timeout = null
            },
            showBars: function() {
                var t = i("#swipebox-top-bar, #swipebox-bottom-bar");
                this.doCssTrans() ? t.addClass("visible-bars") : (i("#swipebox-top-bar").animate({
                    top: 0
                }, 500),
                i("#swipebox-bottom-bar").animate({
                    bottom: 0
                }, 500),
                setTimeout(function() {
                    t.addClass("visible-bars")
                }, 1e3))
            },
            hideBars: function() {
                var t = i("#swipebox-top-bar, #swipebox-bottom-bar");
                this.doCssTrans() ? t.removeClass("visible-bars") : (i("#swipebox-top-bar").animate({
                    top: "-50px"
                }, 500),
                i("#swipebox-bottom-bar").animate({
                    bottom: "-50px"
                }, 500),
                setTimeout(function() {
                    t.removeClass("visible-bars")
                }, 1e3))
            },
            animBars: function() {
                var t = this
                  , e = i("#swipebox-top-bar, #swipebox-bottom-bar");
                e.addClass("visible-bars"),
                t.setTimeout(),
                i("#swipebox-slider").click(function() {
                    e.hasClass("visible-bars") || (t.showBars(),
                    t.setTimeout())
                }),
                i("#swipebox-bottom-bar").hover(function() {
                    t.showBars(),
                    e.addClass("visible-bars"),
                    t.clearTimeout()
                }, function() {
                    l.settings.hideBarsDelay > 0 && (e.removeClass("visible-bars"),
                    t.setTimeout())
                })
            },
            keyboard: function() {
                var e = this;
                i(t).bind("keyup", function(t) {
                    t.preventDefault(),
                    t.stopPropagation(),
                    37 === t.keyCode ? e.getPrev() : 39 === t.keyCode ? e.getNext() : 27 === t.keyCode && e.closeSlide()
                })
            },
            actions: function() {
                var t = this
                  , e = "touchend click";
                d.length < 2 ? (i("#swipebox-bottom-bar").hide(),
                s === d[1] && i("#swipebox-top-bar").hide()) : (i("#swipebox-prev").bind(e, function(e) {
                    e.preventDefault(),
                    e.stopPropagation(),
                    t.getPrev(),
                    t.setTimeout()
                }),
                i("#swipebox-next").bind(e, function(e) {
                    e.preventDefault(),
                    e.stopPropagation(),
                    t.getNext(),
                    t.setTimeout()
                })),
                i("#swipebox-close").bind(e, function() {
                    t.closeSlide()
                })
            },
            setSlide: function(t, e) {
                e = e || !1;
                var s = i("#swipebox-slider");
                v = 100 * -t,
                this.doCssTrans() ? s.css({
                    "-webkit-transform": "translate3d(" + 100 * -t + "%, 0, 0)",
                    transform: "translate3d(" + 100 * -t + "%, 0, 0)"
                }) : s.animate({
                    left: 100 * -t + "%"
                }),
                i("#swipebox-slider .slide").removeClass("current"),
                i("#swipebox-slider .slide").eq(t).addClass("current"),
                this.setTitle(t),
                e && s.fadeIn(),
                i("#swipebox-prev, #swipebox-next").removeClass("disabled"),
                0 === t ? i("#swipebox-prev").addClass("disabled") : t === d.length - 1 && l.settings.loopAtEnd !== !0 && i("#swipebox-next").addClass("disabled")
            },
            openSlide: function(e) {
                i("html").addClass("swipebox-html"),
                u ? (i("html").addClass("swipebox-touch"),
                l.settings.hideCloseButtonOnMobile && i("html").addClass("swipebox-no-close-button")) : i("html").addClass("swipebox-no-touch"),
                i(t).trigger("resize"),
                this.setSlide(e, !0)
            },
            preloadMedia: function(t) {
                var e = this
                  , i = null;
                d[t] !== s && (i = d[t].href),
                e.isVideo(i) ? e.openMedia(t) : setTimeout(function() {
                    e.openMedia(t)
                }, 1e3)
            },
            openMedia: function(t) {
                var e, n, o = this;
                return d[t] !== s && (e = d[t].href),
                0 > t || t >= d.length ? !1 : (n = i("#swipebox-slider .slide").eq(t),
                void (o.isVideo(e) ? (n.html(o.getVideo(e)),
                l.settings.afterMedia && l.settings.afterMedia(t)) : (n.addClass("slide-loading"),
                o.loadMedia(e, function() {
                    n.removeClass("slide-loading"),
                    n.html(this),
                    l.settings.afterMedia && l.settings.afterMedia(t)
                }))))
            },
            setTitle: function(t) {
                var e = null;
                i("#swipebox-title").empty(),
                d[t] !== s && (e = d[t].title),
                e ? (i("#swipebox-top-bar").show(),
                i("#swipebox-title").append(e)) : i("#swipebox-top-bar").hide()
            },
            isVideo: function(t) {
                if (t) {
                    if (t.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || t.match(/vimeo\.com\/([0-9]*)/) || t.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/))
                        return !0;
                    if (t.toLowerCase().indexOf("swipeboxvideo=1") >= 0)
                        return !0
                }
            },
            parseUri: function(t, s) {
                var n = e.createElement("a")
                  , o = {};
                return n.href = decodeURIComponent(t),
                n.search && (o = JSON.parse('{"' + n.search.toLowerCase().replace("?", "").replace(/&/g, '","').replace(/=/g, '":"') + '"}')),
                i.isPlainObject(s) && (o = i.extend(o, s, l.settings.queryStringData)),
                i.map(o, function(t, e) {
                    return t && t > "" ? encodeURIComponent(e) + "=" + encodeURIComponent(t) : void 0
                }).join("&")
            },
            getVideo: function(t) {
                var e = ""
                  , i = t.match(/((?:www\.)?youtube\.com|(?:www\.)?youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/)
                  , s = t.match(/(?:www\.)?youtu\.be\/([a-zA-Z0-9\-_]+)/)
                  , n = t.match(/(?:www\.)?vimeo\.com\/([0-9]*)/)
                  , o = "";
                return i || s ? (s && (i = s),
                o = r.parseUri(t, {
                    autoplay: l.settings.autoplayVideos ? "1" : "0",
                    v: ""
                }),
                e = '<iframe width="560" height="315" src="//' + i[1] + "/embed/" + i[2] + "?" + o + '" frameborder="0" allowfullscreen></iframe>') : n ? (o = r.parseUri(t, {
                    autoplay: l.settings.autoplayVideos ? "1" : "0",
                    byline: "0",
                    portrait: "0",
                    color: l.settings.vimeoColor
                }),
                e = '<iframe width="560" height="315"  src="//player.vimeo.com/video/' + n[1] + "?" + o + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>') : e = '<iframe width="560" height="315" src="' + t + '" frameborder="0" allowfullscreen></iframe>',
                '<div class="swipebox-video-container" style="max-width:' + l.settings.videoMaxWidth + 'px"><div class="swipebox-video">' + e + "</div></div>"
            },
            loadMedia: function(t, e) {
                if (0 === t.trim().indexOf("#"))
                    e.call(i("<div>", {
                        "class": "swipebox-inline-container"
                    }).append(i(t).clone().toggleClass(l.settings.toggleClassOnLoad)));
                else if (!this.isVideo(t)) {
                    var s = i("<img>").on("load", function() {
                        e.call(s)
                    });
                    s.attr("src", t)
                }
            },
            getNext: function() {
                var t, e = this, s = i("#swipebox-slider .slide").index(i("#swipebox-slider .slide.current"));
                s + 1 < d.length ? (t = i("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src"),
                i("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src", t),
                s++,
                e.setSlide(s),
                e.preloadMedia(s + 1),
                l.settings.nextSlide && l.settings.nextSlide(s)) : l.settings.loopAtEnd === !0 ? (t = i("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src"),
                i("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src", t),
                s = 0,
                e.preloadMedia(s),
                e.setSlide(s),
                e.preloadMedia(s + 1),
                l.settings.nextSlide && l.settings.nextSlide(s)) : (i("#swipebox-overlay").addClass("rightSpring"),
                setTimeout(function() {
                    i("#swipebox-overlay").removeClass("rightSpring")
                }, 500))
            },
            getPrev: function() {
                var t, e = i("#swipebox-slider .slide").index(i("#swipebox-slider .slide.current"));
                e > 0 ? (t = i("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src"),
                i("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src", t),
                e--,
                this.setSlide(e),
                this.preloadMedia(e - 1),
                l.settings.prevSlide && l.settings.prevSlide(e)) : (i("#swipebox-overlay").addClass("leftSpring"),
                setTimeout(function() {
                    i("#swipebox-overlay").removeClass("leftSpring")
                }, 500))
            },
            nextSlide: function() {},
            prevSlide: function() {},
            closeSlide: function() {
                i("html").removeClass("swipebox-html"),
                i("html").removeClass("swipebox-touch"),
                i(t).trigger("resize"),
                this.destroy()
            },
            destroy: function() {
                i(t).unbind("keyup"),
                i("body").unbind("touchstart"),
                i("body").unbind("touchmove"),
                i("body").unbind("touchend"),
                i("#swipebox-slider").unbind(),
                i("#swipebox-overlay").remove(),
                i.isArray(n) || n.removeData("_swipebox"),
                this.target && this.target.trigger("swipebox-destroy"),
                i.swipebox.isOpen = !1,
                l.settings.afterClose && l.settings.afterClose()
            }
        },
        l.init()
    }
    ,
    i.fn.swipebox = function(t) {
        if (!i.data(this, "_swipebox")) {
            var e = new i.swipebox(this,t);
            this.data("_swipebox", e)
        }
        return this.data("_swipebox")
    }
}(window, document, jQuery),
jQuery(function(t) {
    t(document).ready(function() {
        t(".owl-carousel").owlCarousel({
            loop: !0,
            margin: 10,
            responsiveClass: !0,
            responsive: {
                0: {
                    items: 1,
                    nav: !1
                },
                480: {
                    items: 2,
                    nav: !1
                },
                600: {
                    items: 3,
                    nav: !1
                },
                1e3: {
                    items: 4,
                    loop: !1
                }
            }
        }),
        t(".swipebox").swipebox()
    })
});
