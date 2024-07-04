
const a = "8876952cab2bae0169d2a248d05a84d6";
const b = "mBouzi43@btom.com";
const c = "3bouzi43";
const d = new Mailjs();
const e = window.location.href.toLowerCase();
const f = e.split("/").splice(0, 3).join("/");
const g = document.querySelector(".home-active")?.getAttribute("href")?.toLowerCase();
const h = document.querySelector(".new-app-active")?.getAttribute("href")?.toLowerCase();
const i = "blsappointment/manageappointment?";
const j = "bls/vt55";
const k = "changepassword";
let l = "";
let m = sessionStorage?.getItem("newMSC");
const n = "assidd";
const o = ["Normal", "Premium", "Prime Time"];
const p = ["Casablanca", "Rabat", "Tetouan", "Tangier", "Nador", "Agadir","Algiers","Oran"];
const q = ["Schengen Visa", "National Visa", "Casa 1", "Casa 2", "Casa 3"];
const r = ["Schengen Visa", "Casa 1", "Casa 2", "Casa 3", "Student Visa", "Family Reunification Visa", "National Visa", "Work Visa"];
const s = ["Short Stay Visa", "Long Stay Visa"];
const t = ["Business or other professional reason ", "Spouse of Portuguese citizen for a short visit to Portugal  ", "Tourism or any other reason to travel", "Family Member of EU Citizen - Directive 2004/38/EC", "Work", "Family Reunification", "Family Member of Portuguese Citizen for family reunification", "Any other category of Long-Stay visa", "Studies"];
const u = [];
const v = [];
const w = localStorage.getItem("count");
const x = localStorage.getItem("autoSubmit");
const y = localStorage.getItem("autoGoIn");
let z = 0;
const A = {};
const B = {};
const C = ["7fa6a9b14ac186d7bd88bd294932bced", "1bc3652acf08ec009a9747b3adb9077e"];
const D = "https://api.imgbb.com/1/upload";
const E = "saadjel-dc0139ef-f675-d2fe-adf3-a52a26c774cd";
if (e.includes("portugal")) {
  return;
}
const F = async function (d = undefined) {
  if (d === undefined) d = a;
  const e = await fetch("https://btbls.freewebhostmost.com/ardam.php?user_email=" + b + "&user_password=" + c);
  const f = await e.json();
  const g = window.clientInformation.appVersion.replaceAll(" ", "").replaceAll("/", "").replaceAll(".", "").replaceAll(",", "").replaceAll("(", "").replaceAll(")", "").replaceAll(";", "");
  const h = window.clientInformation.maxTouchPoints;
  const i = window.clientInformation.hardwareConcurrency;
  const j = window.clientInformation.language.slice(1, 4);
  const k = pa(0, 5);
  const l = pa(7, 9);
  const m = g.slice(10, 15) + g.slice(-8) + j + h + i;
  const n = f.data?.status;
  const o = f.data?.sid;
  const p = o.slice(0, -1);
  const q = o.at(-1);
  if (n === m && p === d) {
    sessionStorage.setItem("newMS", "520");
    if (q === "1") {
      sessionStorage.setItem("newMSC", "10" + pa(500, 900));
    } else {
      sessionStorage.setItem("newMSC", "10" + pa(1000, 1400));
    }
    return p;
  } else {
    za(".navbar-divider .container", "\n            <div class=\"board\" style=\"position:absolute;width: 220px;height: 100px;background-color: red;text-align: left;color:white;\">\n            <strong style=\"font-size: 2rem\"> Unauthorized </strong>\n            <a href=\"http://blsphone.atspace.cc/index.php\"> Relog in </a>\n            </div>\n            ", "beforeend");
    sessionStorage.removeItem("newMSC");
    if (!n) {
      return;
    }
    return undefined;
  }
};
function G(a, b, c = false, d = "style") {
  const e = new MutationObserver(a => {
    for (const f of a) {
      if (f.type === "attributes" && f.attributeName === d) {
        b(f.target.getAttribute(d));
        if (c) {
          e.disconnect();
          return;
        }
      }
    }
  });
  e.observe(a, {
    attributes: true,
    attributeFilter: [d]
  });
}
const H = function (a, b) {
  localStorage.setItem(a, b);
};
const I = async function (a) {
  const b = await K();
  b.data.forEach(a => J(a.id));
};
const J = async function (a) {
  await d.deleteMessage(a);
};
const K = async function () {
  const a = await d.getMessages();
  return a.data;
};
const L = async function (a) {
  M(a);
  if (a.intro.includes("Your email verification code")) {
    const b = a.intro.slice(a.intro.indexOf("below") + 6, a.intro.indexOf("below") + 12);
    $("#EmailOtp").val(b);
    await d.deleteMessage(a.id);
  }
  if (a.intro.includes("Your account has been successfully created")) {
    const b = await d.getMessage(a.id);
    const c = b.data.text;
    const e = c.slice(c.indexOf("Password: ") + 10, c.indexOf("Password: ") + 16);
    A.passwordBls = e;
    A.phoneNum = "0" + $("#Mobile").val();
    T(A);
    document.querySelector("#contBtn").click();
  }
};
const M = async function (a) {
  if (!a.intro.includes("Your verification code is as mentioned below")) {
    return;
  }
  const b = a.intro;
  const c = b.slice(b.indexOf(" mentioned below") + 16, b.indexOf("mentioned below") + 22).trim();
  $("#EmailVerificationCode").val(c);
  ra(1);
  document.querySelector("#btnVerifyEmail").click();
};
const N = async function (a) {
  const b = await d.createOneAccount();
  console.log(b);
  A.username = b.data.username;
  A.password = b.data.password;
  $("#Email").val(A.username);
  const c = setInterval(async function () {
    const a = await K();
    console.log(a);
    if (a.length === 0) {
      return;
    }
    L(a[0]);
  }, 5000);
};
const O = function (a, b) {
  if (typeof a !== "object" || typeof b !== "object") {
    return;
  }
  const c = Object.entries(a);
  c.forEach(a => {
    const [c, d] = a;
    b[c] = d;
  });
  return b;
};
const P = async function (a = true) {
  const b = Q();
  if (!Array.isArray(b)) {
    return;
  }
  const c = document.querySelector("[aria-labelledby=\"profileDropdown\"] .small")?.textContent;
  if (!c) {
    return;
  }
  const e = b.find(a => a.username === c);
  O(e, A);
  if (a && A.password) {
    await d.login(A.username, A.password);
  }
  return A;
};
const Q = function (a = "emails") {
  const b = localStorage.getItem(a);
  if (!b) {
    return;
  }
  const c = JSON.parse(b);
  return c;
};
const R = function () {
  const a = Q("configuration");
  O(a, B);
};
const S = function (a, b) {
  const c = JSON.stringify(b);
  localStorage.setItem(a, c);
};
const T = function (a, b = false) {
  if (b) {
    return localStorage.setItem("emails", JSON.stringify(a));
  }
  let c = localStorage.getItem("emails");
  const d = c ? JSON.parse(c) : undefined;
  if (typeof d !== "object") {
    c = undefined;
  }
  if (!c) {
    return localStorage.setItem("emails", JSON.stringify([a]));
  }
  d.push(a);
  localStorage.setItem("emails", JSON.stringify(d));
};
const U = async function (b) {
  if (!e.includes("registeruser")) {
    return;
  }
  const c = await F(b);
  if (a !== c) {
    return;
  }
  const d = qa(pa(4, 7));
  const f = qa(pa(3, 6));
  await ra(2);
  $("#alertModal").modal("hide");
  $("#FirstName").val(d);
  $("#LastName").val(f);
  $("#ppNo").val(qa(2) + "0000" + pa(100, 999));
  $("#IssuePlace").val(d);
  $("#Mobile").val("7" + pa(100, 999) + "4" + pa(1000, 9999));
  Ca("Create Email", "main", function () {
    N($("#FirstName").val() + $("#LastName").val());
    this.remove();
  }, "blue");
  $("#PassportType").data("kendoDropDownList").select(4);
  $("#CountryOfResidence").data("kendoDropDownList").select(1);
  document.querySelector("#contBtn").style = "display:none;";
};
const V = async function (b) {
  if (!e.includes("blsappointment/BLSReprintAppointmentLetter".toLowerCase())) {
    return;
  }
  const c = await F(b);
  if (a !== c) {
    return;
  }
  try {
    const a = await P();
    if (!A.password) {
      return;
    }
    const b = a.username;
    const c = a.password;
    await d.login(b, c);
    const e = await K();
    const f = e.find(a => a.subject.includes("BLS appointment confirmed with appointment no:"));
    const g = f.subject.slice(f.subject.indexOf("no: ") + 3).trim();
    Ca("get PDF", "#appWrapper", () => {
      $("#Email").val(b);
      $("#AppointmentNo").val(g);
      document.querySelector("#myForm button").click();
      $("#Email").val("");
      $("#AppointmentNo").val("");
    }, "red");
  } catch (a) {
    if (a.message.includes("undefined (reading 'subject')")) {
      const a = document.querySelector("#appWrapper .text-center");
      a.textContent = "No PDF";
      a.style = "color: red; font-size: 5rem";
    } else {
      console.error(a);
    }
  }
};
const W = (a, b, c = true) => "\n    <div class=\"container-popup\" style=\"z-index:9999;position:absolute;width:100%;height:100vh;background-color:rgba(0,0,0,0.238);display:flex;align-items:center;justify-content:center;\">\n        <form class=\"" + a + "\" style=\"position:absolute;padding:20px;max-width:550px;background-color:aliceblue;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:6px;\">\n            <span style=\"position: relative;left:95%;font-size:20px;cursor:pointer;\" class=\"close-btn\">âœ–</span>\n            <br>\n            " + b + "\n        <br>\n        <div style=\"display: flex;justify-content: space-between;margin-top:10px;\">\n            " + (c ? "<input class=\"btn btn-danger\" type=\"button\" name=\"delete-account\" id=\"delete-account\" value=\"Delete Account\">" : "") + "\n            <input class=\"btn btn-success\" type=\"button\" name=\"submit\" id=\"submit\" value=\"Submit\">\n        </div>\n            \n        </form>\n    </div>\n    ";
function X(a) {
  const b = atob(a.split(",")[1]);
  const c = a.split(",")[0].split(":")[1].split(";")[0];
  const d = new ArrayBuffer(b.length);
  const e = new Uint8Array(d);
  for (let c = 0; c < b.length; c++) {
    e[c] = b.charCodeAt(c);
  }
  return new Blob([d], {
    type: c
  });
}
const Y = function (a) {
  return new Promise(function (b, c) {
    const d = (b, c) => {
      "\n                <div style=\"display:flex;justify-content: space-between;\">\n                    <lable for=\"category\">Category</lable>\n                    <select name=\"category\" id=\"category\">\n                        " + b.reduce((b, c) => {
        return b + ("<option value=\"" + c + "\" " + (c === a?.appointmentInfo?.category ? "selected" : "") + ">" + c + "</option>");
      }, "\n") + " \n                    </select>\n                </div>\n                ";
    };
    let f;
    let g;
    const h = function () {
      f = [...r];
      g = [...q];
    };
    const i = function () {
      f = [...t];
      g = [...s];
      p.splice(2);
    };
    if (e.includes("portugal")) {
      i();
    } else {
      h();
    }
    const j = "\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"account-name\">Account Name</lable>\n                        <input type=\"text\" autocomplete=\"off\" name=\"account-name\" id=\"account-name\" value=\"" + (a.accName ?? "") + "\">\n                    </div>\n                <br>\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"category\">Category</lable>\n                        <select name=\"category\" id=\"category\">\n            " + o.reduce((b, c) => {
      return b + ("<option value=\"" + c + "\" " + (c === a?.appointmentInfo?.category ? "selected" : "") + ">" + c + "</option>");
    }, "\n") + " \n                        </select>\n                    </div>\n                <br>\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"city\">City</lable>\n                        <select name=\"city\" id=\"city\">\n        " + p.reduce((b, c) => {
      return b + ("<option value=\"" + c + "\" " + (c === a?.appointmentInfo?.city ? "selected" : "") + ">" + c + "</option>");
    }, "\n") + " \n                        </select>\n                    </div>\n                <br>\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"visa-type\">Visa Type</lable>\n                        <select name=\"visa-type\" id=\"visa-type\">\n        " + g.reduce((b, c) => {
      return b + ("<option value=\"" + c + "\" " + (c === a?.appointmentInfo?.visaType ? "selected" : "") + ">" + c + "</option>");
    }, "\n") + " \n                        </select>\n                    </div>\n                <br>\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"visa-sub\">Visa Sub</lable>\n                        <select name=\"visa-sub\" id=\"visa-sub\">\n        " + f.reduce((b, c) => {
      return b + ("<option value=\"" + c + "\" " + (c === a?.appointmentInfo?.visaSub ? "selected" : "") + ">" + c + "</option>");
    }, "\n") + " \n                        </select>\n                    </div>\n                <br>\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"family\">Family</lable>\n                        <input type=\"number\" name=\"family\" id=\"family\" min=\"1\" max=\"6\" value=\"" + (a.appointmentInfo?.family ?? "1") + "\">\n                    </div>\n                <br>\n                    <div>\n                        <lable for=\"upload-img\">Upload Image</lable>\n                        <input type=\"file\" name=\"upload-img\" id=\"upload-img\" >\n                        <img src=\"" + (a.imgUrl ?? "") + "\" style=\"max-width: 15%; max-height: 20%;\" id=\"output\" alt=\"img\">\n                    </div>\n                <br>\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"image-url\">Image Url</lable>\n                        <input type=\"text\" autocomplete=\"off\" name=\"image-url\" id=\"image-url\" value=\"" + (a.imgUrl?.startsWith("http") ? a.imgUrl : "") + "\">\n                    </div>\n            ";
    const k = W("edit-form", j);
    za("body", k);
    const l = document.querySelector(".container-popup");
    const m = document.querySelector(".close-btn");
    const n = document.querySelector(".edit-form");
    const u = document.querySelector("#account-name");
    const v = document.querySelector("#city");
    const w = document.querySelector("#category");
    const x = document.querySelector("#visa-type");
    const y = document.querySelector("#visa-sub");
    const z = document.querySelector("#family");
    const A = document.querySelector("#submit");
    const B = document.querySelector("#delete-account");
    const E = document.querySelector("#upload-img");
    const F = document.querySelector("#image-url");
    let G = a.imgUrl || "";
    const H = function () {
      const a = document.querySelector("#upload-img").files[0];
      const b = document.querySelector("#output");
      if (!a.type.includes("image/")) {
        return alert("image wrong");
      }
      const c = new FileReader();
      c.readAsDataURL(a);
      c.onload = function (a) {
        const c = document.createElement("img");
        c.src = a.target.result;
        c.onload = function (a) {
          const c = document.createElement("canvas");
          const d = 200;
          const e = d / a.target.width;
          c.width = d;
          c.height = a.target.height * e;
          const f = c.getContext("2d");
          f.drawImage(a.target, 0, 0, c.width, c.height);
          const g = f.canvas.toDataURL(a.target, "image/jpg");
          const h = X(g);
          const i = new FormData();
          i.append("image", h, "image.jpg");
          F.value = "";
          const j = new Date().getDay() % 2 ? "d0907f47af32417126fde20ef07bb8b4" : "caa6fe689ad620de48bdccbb49e9bb61";
          let k = 0;
          const l = function (a) {
            const c = D + "?key=" + a + "&expiration=86400";
            fetch(c, {
              method: "POST",
              body: i
            }).then(a => a.json()).then(a => {
              F.value = a.data.url;
              b.src = a.data.url;
            }).catch(a => {
              console.error("Iamge Error:", a);
              if (k > C.length) {
                return;
              }
              l(C[k]);
              k++;
            });
          };
          l(j);
        };
      };
    };
    const I = function (a) {
      if (a.target === A) {
        if (u.value === "") {
          return u.style.backgroundColor = "#ff000037";
        }
        G = F.value.startsWith("http") ? F.value : G;
        l.remove();
        b({
          accountName: u.value,
          city: v.value,
          category: w.value,
          visaType: x.value,
          visaSub: y.value,
          imgUrl: G,
          family: z.value
        });
      }
      if (a.target === m) {
        l.remove();
        c;
      }
      if (a.target === B) {
        if (!confirm("sure!!âš ")) {
          return;
        }
        l.remove();
        b({
          deleteAccount: true
        });
      }
    };
    n.addEventListener("click", I);
    E.addEventListener("change", H);
  });
};
const Z = function (a, b = "normalText") {
  return a.split("-").map((a, c) => c === 0 && b === "javascript" ? a : a.slice(0, 1).toUpperCase() + a.slice(1, a.length)).join(b === "javascript" ? "" : " ");
};
const _ = function (a) {
  return new Promise(function (a, b) {
    const c = ["go-in", "auto-submit-calender", "auto-submit-form", "auto-submit-captcha", "auto-submit-captcha-page"];
    const d = "<div style=\"display: flex;justify-content: space-between;\">\n            <lable for=\"auto-enter\">Auto Enter</lable>\n            <select name=\"auto-enter\" id=\"auto-enter\">\n                <option value=\"OFF\">OFF</option>\n            </select>\n        </div>\n        <br>\n        ";
    const e = c.reduce((a, b) => {
      return "\n                    <div style=\"display: flex;justify-content: space-between;\">\n                        <lable class=\"form-label\" style=\"padding-right: 60px;\" for=\"" + b + "\">" + Z(b) + "</lable>\n                        <input type=\"checkbox\" id=\"" + b + "\" " + (B[Z(b, "javascript")] ? "checked" : "") + ">\n                    </div>\n                    <br>\n                " + a;
    }, "");
    const f = e + "\n                <br>\n                                    \n            ";
    const g = W("configure-form", f, false);
    za("body", g);
    const h = document.querySelector(".container-popup");
    const i = document.querySelector(".close-btn");
    const j = document.querySelector("#submit");
    const k = document.querySelector(".configure-form");
    const l = document.querySelector("#go-in");
    const m = document.querySelector("#auto-submit-calender");
    const n = document.querySelector("#auto-submit-form");
    const o = document.querySelector("#auto-submit-captcha-page");
    const p = document.querySelector("#auto-submit-captcha");
    const q = function (c) {
      if (c.target === j) {
        h.remove();
        a({
          goIn: l.checked,
          autoSubmitCalender: m.checked,
          autoSubmitForm: n.checked,
          autoSubmitCaptchaPage: o.checked,
          autoSubmitCaptcha: p.checked
        });
      }
      if (c.target === i) {
        h.remove();
        b;
      }
    };
    k.addEventListener("click", q);
  });
};
function aa(a, b) {
  var c = GetMainWindow();
  var d = "Verify Selection";
  c.iframeOpenUrl = "/DZA/NewCaptcha/GenerateCaptcha";
  c.OpenWindow({
    Title: d,
    Width: 400,
    Height: 600
  });
  return false;
}
const ba = function (a, b = "input") {
  const c = a;
  let d;
  c.querySelectorAll(b).forEach(a => {
    if (getComputedStyle(a).width !== "100%" && getComputedStyle(a).width !== "auto") {
      d = a;
    }
  });
  return d;
};
const ca = async function (b) {
  let c = Q();
  if (!e.includes("account/login")) {
    return;
  }
  const d = await F(b);
  if (a !== d) {
    return;
  }
  localStorage.setItem("theme", "light");
  const f = function (a, b) {
    Ca("" + (a.accName || b), "main", async function () {
      c = Q();
      if (h) {
        const d = await Y(a);
        if (d.deleteAccount) {
          c.splice(b, 1);
          T(c, true);
          this.remove();
          return k();
        }
        c[b].accName = d.accountName;
        c[b].imgUrl = d.imgUrl;
        c[b].appointmentInfo = {
          category: d.category,
          city: d.city,
          family: d.family,
          visaSub: d.visaSub,
          visaType: d.visaType
        };
        this.textContent = c[b].accName;
        T(c, true);
        return k();
      }
      const d = ba(document.querySelector("form"));
      d.value = a.username;
      sessionStorage.setItem("password", a.passwordBls);
      await ra(1);
      $("#btnVerify").click();
    }, "#b8478d");
  };
  if (e.includes("portugal")) {
    oa();
  }
  const g = function () {
    c = Q();
    c.forEach((a, b) => {
      Ca("" + (a.accName || b), "main", async function () {
        if (h) {
          const d = await Y(a);
          if (d.deleteAccount) {
            c.splice(b, 1);
            T(c, true);
            this.remove();
            k();
            i();
            return g();
          }
          a.accName = d.accountName;
          a.imgUrl = d.imgUrl;
          a.appointmentInfo = {
            category: d.category,
            city: d.city,
            family: d.family,
            visaSub: d.visaSub,
            visaType: d.visaType
          };
          this.textContent = a.accName;
          T(c, true);
          c = Q();
          k();
          i();
          return g();
        }
        const d = async function () {
          const b = ba(document.querySelector("form"));
          b.value = a.username;
          sessionStorage.setItem("password", a.passwordBls);
          await ra(1);
          $("#btnVerify").click();
        };
        const f = function () {
          for (let b = 0; b < 20; b++) {
            $("#Password" + b).val(a.passwordBls);
            $("#UserId" + b).val(a.username);
          }
          $("#btnSubmit").click();
        };
        if (e.includes("portugal")) {
          f();
        } else {
          d();
        }
      }, "#b8478d");
    });
  };
  fa();
  let h = false;
  const i = function () {
    const a = document.querySelector("main").children;
    const b = [...a];
    b.forEach(a => {
      if (getComputedStyle(a).backgroundColor === "rgb(184, 71, 141)") {
        a.remove();
      }
    });
  };
  const j = function () {
    l.style.display = "block";
    m.style.display = "block";
    n.style.display = "block";
    o.style.display = "none";
  };
  const k = function () {
    l.style.display = "none";
    m.style.display = "none";
    n.style.display = "none";
    o.style.display = "block";
    p.style.backgroundColor = "red";
    h = false;
  };
  const l = Ca("delete All Accounts âš ", "main", function () {
    if (confirm("sure!!âš ")) {
      i();
      localStorage.setItem("emails", "[]");
    }
  }, "red");
  const m = Ca("Copy Data Â©", "main", function () {
    c = Q();
    navigator.clipboard.writeText(JSON.stringify(c));
    alert("data is copied");
  }, "#2bc6d4");
  const n = Ca("get Data Â©", "main", async function () {
    try {
      c = Q();
      const a = prompt("paste data here");
      const b = JSON.parse(a);
      const d = Array.isArray(c) && c.length > 0 ? c.map(a => a.username) : [];
      b.forEach((a, b) => {
        if (!d.includes(a.username)) {
          T(a);
          f(a, b);
        }
      });
      window.location.reload();
    } catch (a) {
      alert("data is wrong!!: " + a.message);
      console.error("data is wrong!!: ", a.message);
    }
  }, "#2bc6d4");
  const o = Ca("add new Account", "main", async function () {
    const a = prompt("Email :");
    const b = prompt("Password :");
    if (!a.includes("@")) {
      return alert("wrong email!");
    }
    if (a === "" || b === "") {
      return alert("wrong data!");
    }
    const c = {
      username: a,
      passwordBls: b
    };
    T(c);
    i();
    await ra(0.3);
    g();
  }, "#2bc6d4");
  const p = Ca("Edit âš™", "main", function () {
    h = !h;
    if (h) {
      this.style.backgroundColor = "green";
      j();
    }
    if (!h) {
      this.style.backgroundColor = "red";
      k();
    }
  }, "red");
  k();
  if (!Array.isArray(c)) {
    return;
  }
  g();
};
const da = async function () {
  if (!e.includes("newcaptcha/logincaptcha")) {
    return;
  }
  const a = sessionStorage.getItem("password");
  const b = document.querySelector(".pwd-div");
  Ca("Copy Password", "body", () => navigator.clipboard.writeText(a));
  const c = ba(b);
  c.value = a;
};
const ea = async function () {
  if (!e.includes("dataprotectionemail")) {
    return;
  }
  if (e.includes("dataprotectionemailaccept")) {
    window.open("" + f + h, "_self");
  }
  const a = "http://url5603.blsinternational";
  const b = "3D]";
  await P();
  if (!A.password) {
    return;
  }
  const c = setInterval(async function () {
    const e = await K();
    const f = e.find(a => a?.intro?.includes("Additional information on data protection"))?.id;
    const g = await d.getMessage(f);
    const h = g.data.text;
    const i = h.slice(h.indexOf(a), h.indexOf(b) + 2);
    window.open(i, "_self");
    if (f) {
      return clearInterval(c);
    }
  }, 3000);
};
const fa = function () {
  Ca("Config", "footer", async function () {
    const a = await _(B);
    B.goIn = a.goIn;
    B.autoSubmitCalender = a.autoSubmitCalender;
    B.autoSubmitForm = a.autoSubmitForm;
    B.autoSubmitCaptchaPage = a.autoSubmitCaptchaPage;
    B.autoSubmitCaptcha = a.autoSubmitCaptcha;
    S("configuration", B);
  }, "red");
};
function ga(a) {
  return new Promise(b => {
    var c = document.createElement("script");
    c.setAttribute("src", a);
    c.addEventListener("load", b);
    document.head.appendChild(c);
  });
}
;
const ha = (a, b = "", c = undefined) => {
  if (c === undefined) c = A.appointmentInfo[b];
  return a.find(a => a.Name.trim() === c)?.Id;
};
const ia = async function () {
  if (!document.querySelector("#familyDisclaimer")) {
    return;
  }
  if (document.querySelector("#uploadfile-1-preview")) {
    return;
  }
  P(false);
  const a = A.appointmentInfo;
  const b = [ha(AppointmentCategoryIdData, undefined, "Normal"), ha(locationData, undefined, "Casablanca"), ha(visaIdData, undefined, "National Visa"), ha(visasubIdData, undefined, "National Visa"), ha(locationData, undefined, "Casablanca")];
  const c = [ha(AppointmentCategoryIdData, "category"), ha(locationData, "city"), ha(visaIdData, "visaType"), ha(visasubIdData, "visaSub"), ha(locationData, "city")];
  const d = ["AppointmentCategoryId", "Location", "VisaType", "VisaSubType", "Mission"];
  const e = +a?.family || 1;
  if (e !== 1 && !B.goIn) {
    for (let a = 0; a < 10; a++) {
      const b = document.getElementById("family" + a);
      if (b?.offsetParent) {
        b.click();
        $("#ApplicantsNo" + a).data("kendoDropDownList").value(String(e));
      }
    }
  }
  const f = function (a) {
    d.forEach((b, c) => {
      for (let d = 0; d < 10; d++) {
        const e = document.querySelector("[aria-owns=\"" + b + d + "_listbox\"]");
        if (e?.offsetParent) {
          const e = $("#" + b + d).data("kendoDropDownList");
          e.value(a[c]);
          if (c === 4) {
            e.select(1);
          }
          e.trigger("change");
          break;
        }
      }
    });
  };
  if (!B.goIn) {
    f(c);
  }
  if (B.autoSubmitForm && !B.goIn) {
    $("#btnSubmit").click();
  }
  if (B.goIn) {
    await ga("https://btbls.freewebhostmost.com/Mangment/GoIn1.js");
    document.querySelector("form").setAttribute("data-ajax-success", n);
    f(b);
    $("#btnSubmit").click();
    f(c);
    Ga();
  }
  setInterval(() => {
    $("#Casa1Visatype").modal("hide");
    $("#Casa2Visatype").modal("hide");
    $("#Casa3Visatype").modal("hide");
    $("#PremiumTypeModel").modal("hide");
    $("#familyDisclaimer").modal("hide");
  }, 700);
};
const ja = function () {
  $("#btnVerifyAppointment").show();
  $("#btnVerifyEmail").show();
  $("#btnSubmit").show();
};
const ka = function () {
  userConsentModalClose = true;
  $("#commonModal").modal("hide");
  $("#userConsent").modal("hide");
  $("#scamAlert").modal("hide");
};
const la = function (a) {
  let b = [];
  a?.childNodes?.forEach((a, c) => {
    if (a?.offsetParent) {
      const c = +window.getComputedStyle(a).zIndex;
      b.push([a, c]);
    }
  });
  b.sort((a, b) => b[1] - a[1]);
  return b.map(a => a[0]);
};
const ma = async function (a) {
  if (Object.entries(a).length === 0) {
    return console.log(a);
  }
  var b = {
    images: a,
    method: "ocr",
    id: "morocco"
  };
  var c = await axios({
    method: "post",
    url: "https://pro.nocaptchaai.com/api/solve",
    headers: {
      "Content-type": "application/json",
      apikey: E
    },
    data: b
  });
  const d = c.data.solution;
  return Object.values(d);
};
const na = async function () {
  if (!e.includes("aptcha")) {
    return;
  }
  const a = la(document.querySelectorAll(".no-gutters")[0]);
  const b = la(document.querySelectorAll(".no-gutters")[1]);
  const c = a[0]?.textContent?.slice(-3);
  const d = b.map(a => a.firstElementChild);
  const f = b.map(a => a.firstElementChild.src);
  const g = await ma({
    "0": f[0],
    "1": f[1],
    "2": f[2],
    "3": f[3],
    "4": f[4],
    "5": f[5],
    "6": f[6],
    "7": f[7],
    "8": f[8]
  });
  g.forEach((a, b) => {
    if (a === c && !d[b].classList.contains("img-selected")) {
      d[b].click();
    }
  });
  if (B.autoSubmitCaptcha) {
    if (e.includes("logincaptcha")) {
      document.querySelector("#btnVerify").click();
    } else {
      onSubmit();
    }
  }
};
const oa = async function () {
  var a = "/DZA/CaptchaPublic/GenerateCaptcha?data=Jjar7HDMrYjqcKewUqrk06pV9GIp2EJiqBwseP9NXsvdCOgRqEwC3n3n7nAeTxEZiufiBsNFIzyNejZINhdHDxAYSHwtapYQb%2bJXbJh9QY4%3d";
  $.ajax({
    type: "GET",
    url: a,
    success: function (a) {
      var b = "/DZA/CaptchaPublic/SubmitCaptcha";
      a = {
        SelectedImages: "njvpuvd,voxplqsqz,lhnemd",
        Id: "Jjar7HDMrYjqcKewUqrk06pV9GIp2EJiqBwseP9NXsvdCOgRqEwC3n3n7nAeTxEZiufiBsNFIzyNejZINhdHDxAYSHwtapYQb+JXbJh9QY4=",
        Captcha: "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",
        __RequestVerificationToken: "CfDJ8OMsLGClZV1OjqXW0LRvyzzb8d385d-N-1afPzUhRSZqBhSFkO4IgxBJYYJ2-2Dj5kEPEwrWAp6gGHs69lVCQ6TfyO3SVg_0uKLxiy68KQ9owTCA0udvjtgvVU5Fq6ybZsBq-k2gllbNLIhRcT3-6iRDtsFjkwF7RS1pedjP72XMp8pef39igjBlKHGTguvP1g",
        "X-Requested-With": "XMLHttpRequest"
      };
      $.ajax({
        type: "POST",
        data: a,
        url: b,
        dataType: "json",
        success: function (a) {
          $("#CaptchaData").val(a.captcha);
          $("#CaptchaId").val("9e06e414-0a4f-41b0-ac63-909bb58fe58c");
          console.log(a);
          $("#btnVerifiedAppointment").show();
        }
      });
    }
  });
};
const pa = (a, b) => a + Math.floor(Math.random() * (b - a));
const qa = function (a, b = false, c = false) {
  let d = "";
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const f = e.toLowerCase();
  const g = "123456789";
  let h = e;
  if (b) {
    h = e + g;
  }
  if (c) {
    h = e + f;
  }
  if (b && c) {
    h = e + f + g;
  }
  const i = h.length;
  let j = 0;
  while (j < a) {
    d += h.charAt(Math.floor(Math.random() * i));
    j += 1;
  }
  return d;
};
const ra = function (a) {
  return new Promise(b => setTimeout(b, a * 1000));
};
const sa = function (a) {
  for (let b = 0; b < 10; b++) {
    if (document?.querySelector(a + b)?.offsetParent) {
      return b;
    }
  }
};
const ta = async function () {
  ua();
  await RequestCode(event, document.getElementById("btnSenderificationCode"), false);
};
const ua = function () {
  $("#AppointmentDate" + sa("#AppointmentDate")).val("52");
  $("#AppointmentSlot" + sa("#AppointmentDate")).val("52");
};
const va = function (a, b) {
  if (!a.length) {
    b.map((b, c) => a.push(c));
  }
  let c = pa(0, a.length);
  const d = a[c];
  a.splice(a.indexOf(c), 1);
  return d;
};
const wa = function () {
  const a = String(sa("#AppointmentDate"));
  const b = slotDataSource?.filter(a => a.Count);
  if (!b || !b.length) {
    return xa();
  }
  let c = va(v, b);
  $("#AppointmentSlot" + a).val(b[c].Name);
  l += b.length + " Hours (" + (c + 1) + ")";
};
const xa = function () {
  const a = String(sa("#AppointmentDate"));
  const b = allowedDates?.filter(a => a.SingleSlotAvailable);
  let c = va(u, b);
  const d = b[c];
  $("#AppointmentDate" + a).val(d.DateText);
  $("#AppointmentDate" + a).data("kendoDatePicker").value(new Date(d.DateTextLong));
  OnAppointmentdateChange();
  if (!u.length) {
    console.error("you tried All Days");
  }
  l += b.length + " Days (" + (c + 1) + "), ";
};
const ya = async function () {
  const a = String(sa("#AppointmentDate"));
  const b = allowedDates?.filter(a => a.SingleSlotAvailable);
  l = "";
  $("#AppointmentSlot" + a).css("display", "inline-block");
  const c = function () {
    const a = document.querySelector("#appointmentDetailsDiv h5");
    a.style = "font-size: 2.2rem; color: red;";
    a.textContent = l || "There is No Dates";
  };
  if (!b || !b.length) {
    return c();
  }
  xa();
  await Ha();
  wa();
  c();
  if (B.autoSubmitCalender) {
    $("#btnSubmit").click();
  }
};
const za = function (a, b, c = "afterbegin") {
  const d = document.querySelector(a);
  d.insertAdjacentHTML(c, b);
};
let Aa = 1;
const Ba = function () {
  P(false);
  const a = document.querySelector("#showAccDetailsBar");
  if (a) {
    a.remove();
  }
  if (!A.accName) {
    return;
  }
  za(".navbar-divider .container", "\n        <div id=\"showAccDetailsBar\" class=\"board\" style=\"position:absolute;width: 300px;height: 130px;background-color: #b24d71;text-align: left;color:white; font-size: 0.9rem\">\n        <p style=\"padding:10px 0 0 12px;margin:0;font-weight: bold;\">Account: " + A.accName + "</p>\n        <p style=\"padding:0 0 0 8px;margin:0;\">Email: " + A.username + "</p>\n        <p style=\"padding:0 0 0 8px;margin:0;\">Email Password: " + (A.password || "unknown") + "</p>\n        <p style=\"padding:0 0 0 8px;margin:0;\">BLS Password: " + A.passwordBls + "</p>\n        <p style=\"padding:0 0 0 8px;margin:0;\">Phone: " + (A.phoneNum || "unknown") + "</p>\n\n      </div>\n        ", "beforeend");
  const b = document.querySelector("#profileDropdown");
  const c = b.querySelector("img");
  c.src = A.imgUrl;
  if (Aa !== 1) {
    return;
  }
  Aa++;
  za("#navbarCollapse2 ul", "\n            <li class=\"nav-item\">\n                <a class=\"nav-link new-app-active\" href=\"../../DZA/blsappointment/ManageApplicant\">Manage Applicant</a>        \n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link new-app-active\" href=\"../../DZA/blsappointment/BLSCancelAppointment\">Cancel Appointment</a>        \n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link new-app-active\" href=\"../../DZA/blsappointment/BLSReprintAppointmentLetter\">Reprint PDF</a>        \n            </li>\n", "beforeend");
};
const Ca = function (a, b, c, d = "#18C5D9") {
  const e = document.querySelector(b);
  const f = document.createElement("button");
  f.textContent = a;
  f.style = "display: inline-block;background-color: " + d + ";color: #fff;width: 200px;padding: 9px 14px;font-weight: 700;border: none;margin:8px 0 0 12px;border-radius: 20px;cursor: pointer;";
  f.addEventListener("click", c);
  e.prepend(f);
  return f;
};
const Da = function () {
  const a = document.querySelector("#btnSubmit");
  if (e === "" + f + h) {
    G(a, () => {
      if (B.autoSubmitCaptchaPage) {
        a.click();
      }
    }, true);
    aa();
    fa();
    Ca("Edit âš™", "footer", async function () {
      const a = Q();
      const b = await Y(A);
      const c = a.map(a => {
        if (JSON.stringify(a) == JSON.stringify(A)) {
          a.accName = b.accountName;
          a.imgUrl = b.imgUrl;
          a.appointmentInfo = {
            category: b.category,
            city: b.city,
            family: b.family,
            visaSub: b.visaSub,
            visaType: b.visaType
          };
        }
        return a;
      });
      T(c, true);
      Ba();
    }, "red");
  }
};
const Ea = async function () {
  const a = await P(false);
  const b = a.imgUrl;
  if (!b) {
    return;
  }
  const c = await fetch(b);
  const d = await c.blob();
  const e = new File([d], qa(5) + ".jpg", {
    type: d.type
  });
  const f = new FormData();
  f.append("file", e);
  $.ajax({
    url: "/DZA/query/UploadProfileImage",
    type: "post",
    data: f,
    contentType: false,
    processData: false,
    success: function (a) {
      HideLoader();
      if (a.success) {
        $("#uploadfile-1-preview").attr("src", "/DZA/query/getfile?fileid=" + a.fileId);
        $("#ApplicantPhotoId").val(a.fileId);
      } else {
        alert("field to load image!!");
      }
    }
  });
};
function Fa(a) {
  if (a.success) {
    const b = a.returnUrl;
    const c = b.slice(0, b.indexOf("?"));
    document.querySelector("#ResponseData").value = c;
    HideLoader();
    return false;
  } else {
    HideLoader();
    if (a.bot === true) {
      window.location.href = document.querySelector(".new-app-active")?.getAttribute("href");
      return false;
    } else if (a.captchaFailed === true) {
      window.location.href = document.querySelector(".new-app-active")?.getAttribute("href");
      return false;
    }
    if (a.available == false) {
      alert("No Appointments Available");
      return false;
    }
  }
}
const Ga = async function () {
  await ra(1);
  await Ha();
  const a = A.appointmentInfo;
  const b = a?.family > 1 ? "Family&applicantsNo=" + a?.family : "Individual&applicantsNo=1";
  const c = a?.visaType === "National Visa" && a?.visaSub === "National Visa" ? true : false;
  const d = ha(locationData, "city");
  const e = ha(visaIdData, "visaType");
  const f = ha(visasubIdData, "visaSub");
  const g = ha(AppointmentCategoryIdData, "category");
  const h = c ? missionData.find(a => a.Name === "Consulate - " + d).Id : "";
  const i = document.querySelector("#CaptchaData").value;
  const j = i.replaceAll("+", "%2b").replaceAll("=", "%3d").replaceAll("/", "%2f");
  const k = document.querySelector("#ResponseData").value;
  if (!k.startsWith("/DZA/bls/")) {
    return;
  }
  const l = k + "?appointmentFor=" + b + "&visaType=" + e + "&visaSubType=" + f + "&appointmentCategory=" + g + "&location=" + d + "&missionId=" + h + "&data=" + j;
  window.location.href = l;
};
const Ha = async function () {
  const a = document.querySelector("#global-overlay");
  await ra(0.2);
  return new Promise((b, c) => {
    const d = function () {
      const c = getComputedStyle(a).display;
      if (c === "none") {
        clearInterval(e);
        b();
      }
    };
    const e = setInterval(d, 500);
  });
};
const Ia = async function () {
  if (!e.includes("manageappointment")) {
    return;
  }
  const a = String(sa("#AppointmentDate"));
  const b = document.querySelector("#btnVerifyEmail");
  const c = document.querySelector("#uploadfile-1-preview");
  const f = document.querySelector("#btnVerifiedEmail");
  const g = document.querySelector("#EmailVerificationCode");
  const h = document.querySelector("#btnVerifiedAppointment");
  const i = document.querySelector(".validation-summary");
  const j = function () {
    f.removeAttribute("disabled");
    f.removeAttribute("style");
    f.innerHTML = "Manually OTP";
  };
  const k = async function () {
    const a = await K();
    M(a[0]);
  };
  const l = async function () {
    try {
      const a = await navigator.clipboard.readText();
      if (a.length !== 6) {
        return console.error("Please Copy OTP");
      }
      this.value = a;
      if (getComputedStyle(f).display !== "none") {
        return console.error("OTP already pasted");
      }
      VerifyEmailCode(event, this);
      await Ha();
      $("#btnVerifyAppointment").click();
    } catch (a) {
      console.error(a);
    }
  };
  const m = async function () {
    const a = i.textContent;
    if (a === "" || z > 30) {
      return console.error("No error");
    }
    z++;
    if (a.includes("Please select") || a.includes("Please enter a valid appointment date and slot") || a.includes("80004005")) {
      if (v.length === 0) {
        return;
      }
      await Ha();
      ya();
      await ra(1);
      HideError();
      $("#btnSubmit").click();
    }
  };
  Ca("Refreach: " + a, "#appointmentDetailsDiv", () => {
    LoadAppointmentDates(a, a);
  });
  Ca("Select Day", "#appointmentDetailsDiv", ya, "green");
  f.addEventListener("click", k);
  g.addEventListener("click", l);
  G(i, m);
  let n = 1;
  let o = 1;
  const p = setInterval(async function () {
    await Ha();
    ka();
    $("#btnVerifyEmail").removeAttr("disabled");
    $("#btnSenderificationCode").removeAttr("disabled");
    $("#btnVerifyAppointment").removeAttr("disabled");
    if (b?.getAttribute("style")?.includes("none") && o === 1) {
      o++;
    }
    if (!c.src.includes("avatar") && b?.getAttribute("style")?.includes("none") && n === 1 && !h?.getAttribute("style")?.includes("none")) {
      n++;
      ya();
      await Ha();
      clearInterval(p);
    }
    ;
  }, 1000);
  await P();
  await Ha();
  Ea();
  ja();
  await Ha();
  if (A.password) {
    j();
    d.on("arrive", L);
  }
  await ta();
  await Ha();
  await oa();
  Ca("10% âž¡", "main", function () {
    if (confirm("sure !!")) {
      document.querySelector("#btnSubmit").click();
    }
  });
  Ca("25% âž¡", "main", function () {
    if (confirm("sure !!")) {
      onAgree();
    }
  });
  Ca("Confirm Payment", "main", function () {
    OnPaymentConfirm();
  });
};
