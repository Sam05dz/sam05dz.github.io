const mailjs = new Mailjs();
const curURL = window.location.href.toLowerCase();
const BLSurl = curURL.split("/").splice(0, 3).join("/");
const homeURL = document.querySelector(".home-active")?.getAttribute("href")?.toLowerCase();
const visaTypeURL = document.querySelector(".new-app-active")?.getAttribute("href")?.toLowerCase();
const inside = "blsappointment/manageappointment?";
const formURL = "bls/vt9101";
const passwordChange = "changepassword";
let textToDisplay = "";
const asdStr = "assidd";
const cities = ["Algiers", "Oran"];
const categoryList = ["Normal", "Premium", "Prime Time"];
const visaTypeSelection = ["Schengen Visa", "National Visa", "Schengen Visa( Estonia)"];
const visaTypeSub = ["Schengen Visa", "Schengen Visa( Estonia)"];
const dayBlack = [];
const hourBlack = [];
const count = localStorage.getItem("count");
const autoSubmit = localStorage.getItem("autoSubmit");
const autoGoIn = localStorage.getItem("autoGoIn");
let counter = 0;
const currAcount = {};
const configuration = {};
const IamgeUploaderApiKey = ["f00cbf90bd1833caa9d760e0bde95505", "cee07c2224129c3f6a6cee1ede2e16cb", "b4315a6fbcf15dedad6fbc8510bf0248"];
const ImageUploaderApiEndpoint = "https://api.imgbb.com/1/upload";
const apikey = "nadjibmeharzidv-d0570db9-e662-cf1d-332d-ff4000f47b51";
function observerFun(_0x5373fb, _0x75621f, _0x2b9557 = false, _0x4d0d8d = "style") {
  const _0x57bacb = new MutationObserver(_0x29327d => {
    for (const _0xa74b56 of _0x29327d) {
      if (_0xa74b56.type === "attributes" && _0xa74b56.attributeName === _0x4d0d8d) {
        _0x75621f(_0xa74b56.target.getAttribute(_0x4d0d8d));
        if (_0x2b9557) {
          _0x57bacb.disconnect();
          return;
        }
      }
    }
  });
  _0x57bacb.observe(_0x5373fb, {
    attributes: true,
    attributeFilter: [_0x4d0d8d]
  });
}
const setToLS = function (_0x11af87, _0x158a5b) {
  localStorage.setItem(_0x11af87, _0x158a5b);
};
const deleatAllMsg = async function (_0x257237) {
  const _0x5a6b63 = await getAllMessages();
  _0x5a6b63.data.forEach(_0x3fc955 => deleatMsg(_0x3fc955.id));
};
const deleatMsg = async function (_0x32ab51) {
  await mailjs.deleteMessage(_0x32ab51);
};
const getAllMessages = async function () {
  const _0x27924f = await mailjs.getMessages();
  return _0x27924f.data;
};
const onMsgArrives = async function (_0x1884fa) {
  SetOtpInside(_0x1884fa);
  if (_0x1884fa.intro.includes("Your email verification code")) {
    const _0x15d275 = _0x1884fa.intro.slice(_0x1884fa.intro.indexOf("below") + 6, _0x1884fa.intro.indexOf("below") + 12);
    $("#EmailOtp").val(_0x15d275);
    await mailjs.deleteMessage(_0x1884fa.id);
  }
  if (_0x1884fa.intro.includes("Your account has been successfully created")) {
    const _0x539dae = await mailjs.getMessage(_0x1884fa.id);
    const _0x4d2c46 = _0x539dae.data.text;
    const _0x3c61ac = _0x4d2c46.slice(_0x4d2c46.indexOf("Password: ") + 10, _0x4d2c46.indexOf("Password: ") + 16);
    currAcount.passwordBls = _0x3c61ac;
    currAcount.phoneNum = "0" + $("#Mobile").val();
    setEmailToLocalstorage(currAcount);
    document.querySelector("#contBtn").click();
  }
};
const SetOtpInside = async function (_0x29db90) {
  if (!_0x29db90.intro.includes("Your verification code is as mentioned below")) {
    return;
  }
  const _0x125015 = _0x29db90.intro;
  const _0x836fe0 = _0x125015.slice(_0x125015.indexOf(" mentioned below") + 16, _0x125015.indexOf("mentioned below") + 22).trim();
  $("#EmailVerificationCode").val(_0x836fe0);
  waitFor(1);
  document.querySelector("#btnVerifyEmail").click();
};
const creatNewEmail = async function (_0x4e6139) {
  const _0x19c218 = await mailjs.getDomains();
  const _0x4a0d05 = _0x19c218.data[0].domain;
  const _0x5b491a = randomString(7, true, true);
  const _0x4a5e67 = _0x4e6139.slice(0, 11).toLowerCase().replaceAll(" ", "");
  const _0x2e6668 = await mailjs.register("" + _0x4a5e67 + randomString(3, true).toLowerCase() + "@" + _0x4a0d05, _0x5b491a);
  if (!_0x19c218.status) {
    return console.error(res.message);
  }
  currAcount.username = _0x2e6668.data.address;
  currAcount.password = _0x5b491a;
  $("#Email").val(currAcount.username);
  await waitFor(1);
  await mailjs.login(currAcount.username, currAcount.password);
  await waitFor(3);
  mailjs.on("arrive", onMsgArrives);
};
const copyObj = function (_0x388d61, _0x521616) {
  if (typeof _0x388d61 !== "object" || typeof _0x521616 !== "object") {
    return;
  }
  const _0x443007 = Object.entries(_0x388d61);
  _0x443007.forEach(_0x1055d6 => {
    const [_0x10f280, _0x4ff993] = _0x1055d6;
    _0x521616[_0x10f280] = _0x4ff993;
  });
  return _0x521616;
};
const getCurrentAcount = async function (_0x19c695 = true) {
  const _0x2e4211 = getItemsFromLocalstorage();
  if (!Array.isArray(_0x2e4211)) {
    return;
  }
  const _0x39512d = document.querySelector("[aria-labelledby=\"profileDropdown\"] .small")?.textContent;
  if (!_0x39512d) {
    return;
  }
  const _0x4b64ef = _0x2e4211.find(_0x3aeaf4 => _0x3aeaf4.username === _0x39512d);
  copyObj(_0x4b64ef, currAcount);
  if (_0x19c695 && currAcount.password) {
    await mailjs.login(currAcount.username, currAcount.password);
  }
  return currAcount;
};
const getItemsFromLocalstorage = function (_0xfb1e9e = "emails") {
  const _0x408313 = localStorage.getItem(_0xfb1e9e);
  if (!_0x408313) {
    return;
  }
  const _0x5e236c = JSON.parse(_0x408313);
  return _0x5e236c;
};
const getCofiguration = function () {
  const _0x7afc92 = getItemsFromLocalstorage("configuration");
  copyObj(_0x7afc92, configuration);
};
const setToLocalStorage = function (_0x5dad3a, _0x2c43f4) {
  const _0x2d886a = JSON.stringify(_0x2c43f4);
  localStorage.setItem(_0x5dad3a, _0x2d886a);
};
const setEmailToLocalstorage = function (_0x3c572e, _0x3410e7 = false) {
  if (_0x3410e7) {
    return localStorage.setItem("emails", JSON.stringify(_0x3c572e));
  }
  let _0x15f22c = localStorage.getItem("emails");
  const _0x413b47 = _0x15f22c ? JSON.parse(_0x15f22c) : undefined;
  if (typeof _0x413b47 !== "object") {
    _0x15f22c = undefined;
  }
  if (!_0x15f22c) {
    return localStorage.setItem("emails", JSON.stringify([_0x3c572e]));
  }
  _0x413b47.push(_0x3c572e);
  localStorage.setItem("emails", JSON.stringify(_0x413b47));
};
const createNewAcount = async function (_0xab616e) {
  if (!curURL.includes("registeruser")) {
    return;
  }
  const _0x4ac788 = randomString(randomNum(4, 7));
  const _0x422b00 = randomString(randomNum(3, 6));
  await waitFor(2);
  $("#alertModal").modal("hide");
  $("#FirstName").val(_0x4ac788);
  $("#LastName").val(_0x422b00);
  $("#ppNo").val(randomString(2) + "0000" + randomNum(100, 999));
  $("#IssuePlace").val(_0x4ac788);
  $("#Mobile").val("7" + randomNum(100, 999) + "4" + randomNum(1000, 9999));
  creatBTN("Create Email", "main", function () {
    creatNewEmail($("#FirstName").val() + $("#LastName").val());
    this.remove();
  }, "blue");
  $("#PassportType").data("kendoDropDownList").select(4);
  $("#CountryOfResidence").data("kendoDropDownList").select(1);
  document.querySelector("#contBtn").style = "display:none;";
};
const getPDF = async function (_0x288c9c) {
  if (!curURL.includes("blsappointment/BLSReprintAppointmentLetter".toLowerCase())) {
    return;
  }
  try {
    const _0x15afec = await getCurrentAcount();
    if (!currAcount.password) {
      return;
    }
    const _0xb213fd = _0x15afec.username;
    const _0x3f59fd = _0x15afec.password;
    await mailjs.login(_0xb213fd, _0x3f59fd);
    const _0x387f6c = await getAllMessages();
    const _0x228f9e = _0x387f6c.find(_0x2fa026 => _0x2fa026.subject.includes("BLS appointment confirmed with appointment no:"));
    const _0x137d3a = _0x228f9e.subject.slice(_0x228f9e.subject.indexOf("no: ") + 3).trim();
    creatBTN("get PDF", "#appWrapper", () => {
      $("#Email").val(_0xb213fd);
      $("#AppointmentNo").val(_0x137d3a);
      document.querySelector("#myForm button").click();
      $("#Email").val("");
      $("#AppointmentNo").val("");
    }, "red");
  } catch (_0xc8c63f) {
    if (_0xc8c63f.message.includes("undefined (reading 'subject')")) {
      const _0xd9e853 = document.querySelector("#appWrapper .text-center");
      _0xd9e853.textContent = "No PDF";
      _0xd9e853.style = "color: red; font-size: 5rem";
    } else {
      console.error(_0xc8c63f);
    }
  }
};
const windoFormHTML = (_0x2dd0f0, _0x51d33d, _0x539973 = true) => "\n    <div class=\"container-popup\" style=\"z-index:9999;position:absolute;width:100%;height:100vh;background-color:rgba(0,0,0,0.238);display:flex;align-items:center;justify-content:center;\">\n        <form class=\"" + _0x2dd0f0 + "\" style=\"position:absolute;padding:20px;max-width:550px;background-color:aliceblue;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:6px;\">\n            <span style=\"position: relative;left:95%;font-size:20px;cursor:pointer;\" class=\"close-btn\">–</span>\n            <br>\n            " + _0x51d33d + "\n        <br>\n        <div style=\"display: flex;justify-content: space-between;margin-top:10px;\">\n            " + (_0x539973 ? "<input class=\"btn btn-danger\" type=\"button\" name=\"delete-account\" id=\"delete-account\" value=\"Delete Account\">" : "") + "\n            <input class=\"btn btn-success\" type=\"button\" name=\"submit\" id=\"submit\" value=\"Submit\">\n        </div>\n            \n        </form>\n    </div>\n    ";
function dataURLToBlob(_0x2f10f2) {
  const _0x24ec3c = atob(_0x2f10f2.split(",")[1]);
  const _0x3587af = _0x2f10f2.split(",")[0].split(":")[1].split(";")[0];
  const _0x514cdc = new ArrayBuffer(_0x24ec3c.length);
  const _0x397a52 = new Uint8Array(_0x514cdc);
  for (let _0x44a817 = 0; _0x44a817 < _0x24ec3c.length; _0x44a817++) {
    _0x397a52[_0x44a817] = _0x24ec3c.charCodeAt(_0x44a817);
  }
  return new Blob([_0x514cdc], {
    type: _0x3587af
  });
}
const editWindow = function (_0x341003) {
  return new Promise(function (_0xebc97f, _0x18f30c) {
    const _0x1a6c96 = (_0x2911e7, _0xca0ff3) => {
      "\n                <div style=\"display:flex;justify-content: space-between;\">\n                    <lable for=\"category\">Category</lable>\n                    <select name=\"category\" id=\"category\">\n                        " + _0x2911e7.reduce((_0x5b10b0, _0x35621f) => {
        return _0x5b10b0 + ("<option value=\"" + _0x35621f + "\" " + (_0x35621f === _0x341003?.appointmentInfo?.category ? "selected" : "") + ">" + _0x35621f + "</option>");
      }, "\n") + " \n                    </select>\n                </div>\n                ";
    };
    const _0x383bf3 = "\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"account-name\">Account Name</lable>\n                        <input type=\"text\" autocomplete=\"off\" name=\"account-name\" id=\"account-name\" value=\"" + (_0x341003.accName ?? "") + "\">\n                    </div>\n                <br>\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"category\">Category</lable>\n                        <select name=\"category\" id=\"category\">\n            " + categoryList.reduce((_0x48a27d, _0x610d76) => {
      return _0x48a27d + ("<option value=\"" + _0x610d76 + "\" " + (_0x610d76 === _0x341003?.appointmentInfo?.category ? "selected" : "") + ">" + _0x610d76 + "</option>");
    }, "\n") + " \n                        </select>\n                    </div>\n                <br>\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"city\">City</lable>\n                        <select name=\"city\" id=\"city\">\n        " + cities.reduce((_0x1d5da1, _0x256e74) => {
      return _0x1d5da1 + ("<option value=\"" + _0x256e74 + "\" " + (_0x256e74 === _0x341003?.appointmentInfo?.city ? "selected" : "") + ">" + _0x256e74 + "</option>");
    }, "\n") + " \n                        </select>\n                    </div>\n                <br>\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"visa-type\">Visa Type</lable>\n                        <select name=\"visa-type\" id=\"visa-type\">\n        " + visaTypeSelection.reduce((_0xf80313, _0x34654b) => {
      return _0xf80313 + ("<option value=\"" + _0x34654b + "\" " + (_0x34654b === _0x341003?.appointmentInfo?.visaType ? "selected" : "") + ">" + _0x34654b + "</option>");
    }, "\n") + " \n                        </select>\n                    </div>\n                <br>\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"visa-sub\">Visa Sub</lable>\n                        <select name=\"visa-sub\" id=\"visa-sub\">\n        " + visaTypeSub.reduce((_0x356d08, _0x48db48) => {
      return _0x356d08 + ("<option value=\"" + _0x48db48 + "\" " + (_0x48db48 === _0x341003?.appointmentInfo?.visaSub ? "selected" : "") + ">" + _0x48db48 + "</option>");
    }, "\n") + " \n                        </select>\n                    </div>\n                <br>\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"family\">Family</lable>\n                        <input type=\"number\" name=\"family\" id=\"family\" min=\"1\" max=\"6\" value=\"" + (_0x341003.appointmentInfo?.family ?? "1") + "\">\n                    </div>\n                <br>\n                    <div>\n                        <lable for=\"upload-img\">Upload Image</lable>\n                        <input type=\"file\" name=\"upload-img\" id=\"upload-img\" >\n                        <img src=\"" + (_0x341003.imgUrl ?? "") + "\" style=\"max-width: 15%; max-height: 20%;\" id=\"output\" alt=\"img\">\n                    </div>\n                <br>\n                    <div style=\"display:flex;justify-content: space-between;\">\n                        <lable for=\"image-url\">Image Url</lable>\n                        <input type=\"text\" autocomplete=\"off\" name=\"image-url\" id=\"image-url\" value=\"" + (_0x341003.imgUrl?.startsWith("http") ? _0x341003.imgUrl : "") + "\">\n                    </div>\n            ";
    const _0x1f79ac = windoFormHTML("edit-form", _0x383bf3);
    insertHtmltoDom("body", _0x1f79ac);
    const _0x43cd12 = document.querySelector(".container-popup");
    const _0x5071f7 = document.querySelector(".close-btn");
    const _0x40a53f = document.querySelector(".edit-form");
    const _0x57cf49 = document.querySelector("#account-name");
    const _0x46e941 = document.querySelector("#city");
    const _0x26b3d3 = document.querySelector("#category");
    const _0x30d515 = document.querySelector("#visa-type");
    const _0x261fd5 = document.querySelector("#visa-sub");
    const _0x8bcca3 = document.querySelector("#family");
    const _0x25c87e = document.querySelector("#submit");
    const _0x3d2a8d = document.querySelector("#delete-account");
    const _0x2192fd = document.querySelector("#upload-img");
    const _0x54af45 = document.querySelector("#image-url");
    let _0x3e2f8f = _0x341003.imgUrl || "";
    const _0x437ba9 = function () {
      const _0x14cad6 = document.querySelector("#upload-img").files[0];
      const _0x2ee2b7 = document.querySelector("#output");
      if (!_0x14cad6.type.includes("image/")) {
        return alert("image wrong");
      }
      const _0x5dba8c = new FileReader();
      _0x5dba8c.readAsDataURL(_0x14cad6);
      _0x5dba8c.onload = function (_0x193f90) {
        const _0x476b05 = document.createElement("img");
        _0x476b05.src = _0x193f90.target.result;
        _0x476b05.onload = function (_0x24b95e) {
          const _0xfd1800 = document.createElement("canvas");
          const _0x39ec01 = 200;
          const _0x1e4b69 = _0x39ec01 / _0x24b95e.target.width;
          _0xfd1800.width = _0x39ec01;
          _0xfd1800.height = _0x24b95e.target.height * _0x1e4b69;
          const _0x44eb3c = _0xfd1800.getContext("2d");
          _0x44eb3c.drawImage(_0x24b95e.target, 0, 0, _0xfd1800.width, _0xfd1800.height);
          const _0x30f0f6 = _0x44eb3c.canvas.toDataURL(_0x24b95e.target, "image/jpg");
          const _0x40c973 = dataURLToBlob(_0x30f0f6);
          const _0x2da446 = new FormData();
          _0x2da446.append("image", _0x40c973, "image.jpg");
          _0x54af45.value = "";
          const _0xff9971 = randomNum(0, 2);
          const _0x2bdaff = IamgeUploaderApiKey[_0xff9971];
          const _0x129b78 = ImageUploaderApiEndpoint + "?key=" + _0x2bdaff + "&expiration=604800";
          fetch(_0x129b78, {
            method: "POST",
            body: _0x2da446
          }).then(_0x1ea3bf => _0x1ea3bf.json()).then(_0x19dedb => {
            _0x54af45.value = _0x19dedb.data.url;
            _0x2ee2b7.src = _0x19dedb.data.url;
          }).catch(_0x148076 => {
            console.error("Iamge Error:", _0x148076);
          });
        };
      };
    };
    const _0x5b7b19 = function (_0x402876) {
      if (_0x402876.target === _0x25c87e) {
        if (_0x57cf49.value === "") {
          return _0x57cf49.style.backgroundColor = "#ff000037";
        }
        _0x3e2f8f = _0x54af45.value.startsWith("http") ? _0x54af45.value : _0x3e2f8f;
        _0x43cd12.remove();
        _0xebc97f({
          accountName: _0x57cf49.value,
          city: _0x46e941.value,
          category: _0x26b3d3.value,
          visaType: _0x30d515.value,
          visaSub: _0x261fd5.value,
          imgUrl: _0x3e2f8f,
          family: _0x8bcca3.value
        });
      }
      if (_0x402876.target === _0x5071f7) {
        _0x43cd12.remove();
        _0x18f30c;
      }
      if (_0x402876.target === _0x3d2a8d) {
        if (!confirm("sure!!")) {
          return;
        }
        _0x43cd12.remove();
        _0xebc97f({
          deleteAccount: true
        });
      }
    };
    _0x40a53f.addEventListener("click", _0x5b7b19);
    _0x2192fd.addEventListener("change", _0x437ba9);
  });
};
const cssTypeTo = function (_0x1ed4ad, _0x1fa3f3 = "normalText") {
  return _0x1ed4ad.split("-").map((_0x5b5584, _0x452c87) => _0x452c87 === 0 && _0x1fa3f3 === "javascript" ? _0x5b5584 : _0x5b5584.slice(0, 1).toUpperCase() + _0x5b5584.slice(1, _0x5b5584.length)).join(_0x1fa3f3 === "javascript" ? "" : " ");
};
const configureWindow = function (_0x594411) {
  return new Promise(function (_0x571d54, _0x23e27f) {
    const _0x417e5e = ["go-in", "auto-submit-calender", "auto-submit-form", "auto-submit-captcha", "auto-submit-captcha-page"];
    const _0x4ec513 = "<div style=\"display: flex;justify-content: space-between;\">\n            <lable for=\"auto-enter\">Auto Enter</lable>\n            <select name=\"auto-enter\" id=\"auto-enter\">\n                <option value=\"OFF\">OFF</option>\n            </select>\n        </div>\n        <br>\n        ";
    const _0x24bec2 = _0x417e5e.reduce((_0x58df24, _0x336bc7) => {
      return "\n                    <div style=\"display: flex;justify-content: space-between;\">\n                        <lable class=\"form-label\" style=\"padding-right: 60px;\" for=\"" + _0x336bc7 + "\">" + cssTypeTo(_0x336bc7) + "</lable>\n                        <input type=\"checkbox\" id=\"" + _0x336bc7 + "\" " + (configuration[cssTypeTo(_0x336bc7, "javascript")] ? "checked" : "") + ">\n                    </div>\n                    <br>\n                " + _0x58df24;
    }, "");
    const _0x4cab2a = _0x24bec2 + "\n                <br>\n                                    \n            ";
    const _0x3fd6ba = windoFormHTML("configure-form", _0x4cab2a, false);
    insertHtmltoDom("body", _0x3fd6ba);
    const _0x5ba591 = document.querySelector(".container-popup");
    const _0x4f1073 = document.querySelector(".close-btn");
    const _0x520382 = document.querySelector("#submit");
    const _0x235f95 = document.querySelector(".configure-form");
    const _0x577612 = document.querySelector("#go-in");
    const _0x22db45 = document.querySelector("#auto-submit-calender");
    const _0x932d8c = document.querySelector("#auto-submit-form");
    const _0x2d89e4 = document.querySelector("#auto-submit-captcha-page");
    const _0x1cb779 = document.querySelector("#auto-submit-captcha");
    const _0x277cec = function (_0x23779c) {
      if (_0x23779c.target === _0x520382) {
        _0x5ba591.remove();
        _0x571d54({
          goIn: _0x577612.checked,
          autoSubmitCalender: _0x22db45.checked,
          autoSubmitForm: _0x932d8c.checked,
          autoSubmitCaptchaPage: _0x2d89e4.checked,
          autoSubmitCaptcha: _0x1cb779.checked
        });
      }
      if (_0x23779c.target === _0x4f1073) {
        _0x5ba591.remove();
        _0x23e27f;
      }
    };
    _0x235f95.addEventListener("click", _0x277cec);
  });
};
function VerifyCaptcha(_0x334cfb, _0x4d9dca) {
  var _0x3aefbe = GetMainWindow();
  var _0x1f5d1d = "Verify Selection";
  _0x3aefbe.iframeOpenUrl = "/DZA/NewCaptcha/GenerateCaptcha";
  _0x3aefbe.OpenWindow({
    Title: _0x1f5d1d,
    Width: 400,
    Height: 600
  });
  return false;
}
const findingVisibaleInput = function (_0x17ea6a, _0x36ea8d = "input") {
  const _0x1b38bf = _0x17ea6a;
  let _0x1278e7;
  _0x1b38bf.querySelectorAll(_0x36ea8d).forEach(_0x5680ae => {
    if (getComputedStyle(_0x5680ae).width !== "100%" && getComputedStyle(_0x5680ae).width !== "auto") {
      _0x1278e7 = _0x5680ae;
    }
  });
  return _0x1278e7;
};
const showEmails = async function (_0x44795d) {
  let _0x4d052a = getItemsFromLocalstorage();
  if (!curURL.includes("account/login")) {
    return;
  }
  localStorage.setItem("theme", "light");
  const _0x4a03ee = function (_0x7b0983, _0x177263) {
    creatBTN("" + (_0x7b0983.accName || _0x177263), "main", async function () {
      _0x4d052a = getItemsFromLocalstorage();
      if (_0x47a969) {
        const _0x27412e = await editWindow(_0x7b0983);
        if (_0x27412e.deleteAccount) {
          _0x4d052a.splice(_0x177263, 1);
          setEmailToLocalstorage(_0x4d052a, true);
          this.remove();
          return _0x26d949();
        }
        _0x4d052a[_0x177263].accName = _0x27412e.accountName;
        _0x4d052a[_0x177263].imgUrl = _0x27412e.imgUrl;
        _0x4d052a[_0x177263].appointmentInfo = {
          category: _0x27412e.category,
          city: _0x27412e.city,
          family: _0x27412e.family,
          visaSub: _0x27412e.visaSub,
          visaType: _0x27412e.visaType
        };
        this.textContent = _0x4d052a[_0x177263].accName;
        setEmailToLocalstorage(_0x4d052a, true);
        return _0x26d949();
      }
      const _0x145f4a = findingVisibaleInput(document.querySelector("form"));
      _0x145f4a.value = _0x7b0983.username;
      sessionStorage.setItem("password", _0x7b0983.passwordBls);
      await waitFor(1);
      $("#btnVerify").click();
    }, "#b8478d");
  };
  const _0x30a4ef = function () {
    _0x4d052a = getItemsFromLocalstorage();
    _0x4d052a.forEach((_0x131d51, _0x48ffaf) => {
      creatBTN("" + (_0x131d51.accName || _0x48ffaf), "main", async function () {
        if (_0x47a969) {
          const _0xfaba4a = await editWindow(_0x131d51);
          if (_0xfaba4a.deleteAccount) {
            _0x4d052a.splice(_0x48ffaf, 1);
            setEmailToLocalstorage(_0x4d052a, true);
            this.remove();
            _0x26d949();
            _0x53dbc3();
            return _0x30a4ef();
          }
          _0x131d51.accName = _0xfaba4a.accountName;
          _0x131d51.imgUrl = _0xfaba4a.imgUrl;
          _0x131d51.appointmentInfo = {
            category: _0xfaba4a.category,
            city: _0xfaba4a.city,
            family: _0xfaba4a.family,
            visaSub: _0xfaba4a.visaSub,
            visaType: _0xfaba4a.visaType
          };
          this.textContent = _0x131d51.accName;
          setEmailToLocalstorage(_0x4d052a, true);
          _0x4d052a = getItemsFromLocalstorage();
          _0x26d949();
          _0x53dbc3();
          return _0x30a4ef();
        }
        const _0xbb88a9 = findingVisibaleInput(document.querySelector("form"));
        _0xbb88a9.value = _0x131d51.username;
        sessionStorage.setItem("password", _0x131d51.passwordBls);
        await waitFor(1);
        $("#btnVerify").click();
      }, "#b8478d");
    });
  };
  configeBTN();
  let _0x47a969 = false;
  const _0x53dbc3 = function () {
    const _0x2c3097 = document.querySelector("main").children;
    const _0x3441a9 = [..._0x2c3097];
    _0x3441a9.forEach(_0x3669a8 => {
      if (getComputedStyle(_0x3669a8).backgroundColor === "rgb(184, 71, 141)") {
        _0x3669a8.remove();
      }
    });
  };
  const _0x6e107a = function () {
    _0x2ab364.style.display = "block";
    _0x519b84.style.display = "block";
    _0x250b8e.style.display = "block";
    _0x4a10c2.style.display = "none";
  };
  const _0x26d949 = function () {
    _0x2ab364.style.display = "none";
    _0x519b84.style.display = "none";
    _0x250b8e.style.display = "none";
    _0x4a10c2.style.display = "block";
    _0x8a57bb.style.backgroundColor = "red";
    _0x47a969 = false;
  };
  const _0x2ab364 = creatBTN("delete All Accounts", "main", function () {
    if (confirm("sure!!")) {
      _0x53dbc3();
      localStorage.setItem("emails", "[]");
    }
  }, "red");
  const _0x519b84 = creatBTN("Copy Data", "main", function () {
    _0x4d052a = getItemsFromLocalstorage();
    navigator.clipboard.writeText(JSON.stringify(_0x4d052a));
    alert("data is copied");
  }, "#2bc6d4");
  const _0x250b8e = creatBTN("get Data", "main", async function () {
    try {
      _0x4d052a = getItemsFromLocalstorage();
      const _0x227f19 = prompt("paste data here");
      const _0x39ff6f = JSON.parse(_0x227f19);
      const _0x284702 = Array.isArray(_0x4d052a) && _0x4d052a.length > 0 ? _0x4d052a.map(_0x441da7 => _0x441da7.username) : [];
      _0x39ff6f.forEach((_0x3afa9e, _0x230f6a) => {
        if (!_0x284702.includes(_0x3afa9e.username)) {
          setEmailToLocalstorage(_0x3afa9e);
          _0x4a03ee(_0x3afa9e, _0x230f6a);
        }
      });
      window.location.reload();
    } catch (_0x39dad8) {
      alert("data is wrong!!: " + _0x39dad8.message);
      console.error("data is wrong!!: ", _0x39dad8.message);
    }
  }, "#2bc6d4");
  const _0x4a10c2 = creatBTN("add new Account", "main", async function () {
    const _0x1d754e = prompt("Email :");
    const _0x149188 = prompt("Password :");
    if (!_0x1d754e.includes("@")) {
      return alert("wrong email!");
    }
    if (_0x1d754e === "" || _0x149188 === "") {
      return alert("wrong data!");
    }
    const _0x8ea7c = {
      username: _0x1d754e,
      passwordBls: _0x149188
    };
    setEmailToLocalstorage(_0x8ea7c);
    _0x53dbc3();
    await waitFor(0.3);
    _0x30a4ef();
  }, "#2bc6d4");
  const _0x8a57bb = creatBTN("Edit", "main", function () {
    _0x47a969 = !_0x47a969;
    if (_0x47a969) {
      this.style.backgroundColor = "green";
      _0x6e107a();
    }
    if (!_0x47a969) {
      this.style.backgroundColor = "red";
      _0x26d949();
    }
  }, "red");
  _0x26d949();
  if (!Array.isArray(_0x4d052a)) {
    return;
  }
  _0x30a4ef();
};
const settingPassword = async function () {
  if (!curURL.includes("newcaptcha/logincaptcha")) {
    return;
  }
  const _0x168cdc = sessionStorage.getItem("password");
  const _0x1273de = document.querySelector(".pwd-div");
  creatBTN("Copy Password", "body", () => navigator.clipboard.writeText(_0x168cdc));
  const _0x4c4f93 = findingVisibaleInput(_0x1273de);
  _0x4c4f93.value = _0x168cdc;
};
const confirmAcount = async function () {
  if (!curURL.includes("dataprotectionemail")) {
    return;
  }
  if (curURL.includes("dataprotectionemailaccept")) {
    window.open("" + BLSurl + visaTypeURL, "_self");
  }
  const _0xf85904 = "http://url5603.blsinternational";
  const _0x1805ec = "3D]";
  await getCurrentAcount();
  if (!currAcount.password) {
    return;
  }
  const _0x3cb527 = setInterval(async function () {
    const _0x3202e3 = await getAllMessages();
    const _0x38faec = _0x3202e3.find(_0x47e673 => _0x47e673?.intro?.includes("Additional information on data protection"))?.id;
    const _0x2f8ec2 = await mailjs.getMessage(_0x38faec);
    const _0x24907e = _0x2f8ec2.data.text;
    const _0x43ed48 = _0x24907e.slice(_0x24907e.indexOf(_0xf85904), _0x24907e.indexOf(_0x1805ec) + 2);
    window.open(_0x43ed48, "_self");
    if (_0x38faec) {
      return clearInterval(_0x3cb527);
    }
  }, 3000);
};
const configeBTN = function () {
  creatBTN("Config", "footer", async function () {
    const _0x160f9c = await configureWindow(configuration);
    configuration.goIn = _0x160f9c.goIn;
    configuration.autoSubmitCalender = _0x160f9c.autoSubmitCalender;
    configuration.autoSubmitForm = _0x160f9c.autoSubmitForm;
    configuration.autoSubmitCaptchaPage = _0x160f9c.autoSubmitCaptchaPage;
    configuration.autoSubmitCaptcha = _0x160f9c.autoSubmitCaptcha;
    setToLocalStorage("configuration", configuration);
  }, "red");
};
function loadScript(_0x1e6aa6) {
  return new Promise(_0x703915 => {
    var _0x3658b6 = document.createElement("script");
    _0x3658b6.setAttribute("src", _0x1e6aa6);
    _0x3658b6.addEventListener("load", _0x703915);
    document.head.appendChild(_0x3658b6);
  });
}
;
const getid = (_0x5aa55d, _0x5b3833 = "", _0x5b1348 = currAcount.appointmentInfo[_0x5b3833]) => _0x5aa55d.find(_0x3a4e92 => _0x3a4e92.Name.trim() === _0x5b1348)?.Id;
const fillingForm = async function () {
  if (!document.querySelector("#familyDisclaimer")) {
    return;
  }
  if (document.querySelector("#uploadfile-1-preview")) {
    return;
  }
  getCurrentAcount(false);
  const _0x53069f = currAcount.appointmentInfo;
  const _0x46c318 = [getid(AppointmentCategoryIdData, undefined, "Normal"), getid(locationData, undefined, "Algiers"), getid(visaIdData, undefined, "Schengen Visa"), getid(visasubIdData, undefined, "Schengen Visa"), getid(locationData, undefined, "Algiers")];
  const _0x37323a = [getid(AppointmentCategoryIdData, "category"), getid(locationData, "city"), getid(visaIdData, "visaType"), getid(visasubIdData, "visaSub"), getid(locationData, "city")];
  const _0x514479 = ["AppointmentCategoryId", "Location", "VisaType", "VisaSubType", "Mission"];
  const _0x36917e = +_0x53069f?.family || 1;
  if (_0x36917e !== 1 && !configuration.goIn) {
    for (let _0x1f6180 = 0; _0x1f6180 < 10; _0x1f6180++) {
      const _0x3c5522 = document.getElementById("family" + _0x1f6180);
      if (_0x3c5522?.offsetParent) {
        _0x3c5522.click();
        $("#ApplicantsNo" + _0x1f6180).data("kendoDropDownList").value(String(_0x36917e));
      }
    }
  }
  const _0x3ee993 = function (_0x49381e) {
    _0x514479.forEach((_0x87d5a, _0x654bd7) => {
      for (let _0x369146 = 0; _0x369146 < 10; _0x369146++) {
        const _0x30724f = document.querySelector("[aria-owns=\"" + _0x87d5a + _0x369146 + "_listbox\"]");
        if (_0x30724f?.offsetParent) {
          const _0x565126 = $("#" + _0x87d5a + _0x369146).data("kendoDropDownList");
          _0x565126.value(_0x49381e[_0x654bd7]);
          if (_0x654bd7 === 4) {
            _0x565126.select(1);
          }
          _0x565126.trigger("change");
          break;
        }
      }
    });
  };
  if (!configuration.goIn) {
    _0x3ee993(_0x37323a);
  }
  if (configuration.autoSubmitForm && !configuration.goIn) {
    $("#btnSubmit").click();
  }
  if (configuration.goIn) {
    await loadScript("https://sam05dz.github.io/go.js");
    document.querySelector("form").setAttribute("data-ajax-success", asdStr);
    _0x3ee993(_0x46c318);
    $("#btnSubmit").click();
    _0x3ee993(_0x37323a);
    GoingInside();
  }
};
const showButtons = function () {
  $("#btnVerifyAppointment").show();
  $("#btnVerifyEmail").show();
  $("#btnSubmit").show();
};
const hideModals = function () {
  userConsentModalClose = true;
  $("#commonModal").modal("hide");
  $("#userConsent").modal("hide");
  $("#scamAlert").modal("hide");
};
const imagesSRC = function (_0x5f4794) {
  let _0x31c242 = [];
  _0x5f4794?.childNodes?.forEach((_0xb582b7, _0x31d1a0) => {
    if (_0xb582b7?.offsetParent) {
      const _0x419062 = +window.getComputedStyle(_0xb582b7).zIndex;
      _0x31c242.push([_0xb582b7, _0x419062]);
    }
  });
  _0x31c242.sort((_0x5e3342, _0x544aab) => _0x544aab[1] - _0x5e3342[1]);
  return _0x31c242.map(_0x35360e => _0x35360e[0]);
};
const getCaptchaNumbers = async function (_0x53ea66) {
  if (Object.entries(_0x53ea66).length === 0) {
    return console.log(_0x53ea66);
  }
  var _0xa1be3e = {
    images: _0x53ea66,
    method: "ocr",
    id: "morocco"
  };
  var _0x55fdf6 = await axios({
    method: "post",
    url: "https://pro.nocaptchaai.com/api/solve",
    headers: {
      "Content-type": "application/json",
      apikey: apikey
    },
    data: _0xa1be3e
  });
  const _0x151d2b = _0x55fdf6.data.solution;
  return Object.values(_0x151d2b);
};
const noCaptchaAi = async function () {
  if (!curURL.includes("aptcha")) {
    return;
  }
  const _0x11154f = imagesSRC(document.querySelectorAll(".no-gutters")[0]);
  const _0x576c07 = imagesSRC(document.querySelectorAll(".no-gutters")[1]);
  const _0x41999e = _0x11154f[0]?.textContent?.slice(-3);
  const _0x505e07 = _0x576c07.map(_0x488de6 => _0x488de6.firstElementChild);
  const _0xe3abfd = _0x576c07.map(_0x28b0d2 => _0x28b0d2.firstElementChild.src);
  const _0x66dff3 = await getCaptchaNumbers({
    "0": _0xe3abfd[0],
    "1": _0xe3abfd[1],
    "2": _0xe3abfd[2],
    "3": _0xe3abfd[3],
    "4": _0xe3abfd[4],
    "5": _0xe3abfd[5],
    "6": _0xe3abfd[6],
    "7": _0xe3abfd[7],
    "8": _0xe3abfd[8]
  });
  _0x66dff3.forEach((_0x4cf126, _0x4d95a1) => {
    if (_0x4cf126 === _0x41999e && !_0x505e07[_0x4d95a1].classList.contains("img-selected")) {
      _0x505e07[_0x4d95a1].click();
    }
  });
  if (configuration.autoSubmitCaptcha) {
    if (curURL.includes("logincaptcha")) {
      document.querySelector("#btnVerify").click();
    } else {
      onSubmit();
    }
  }
};
const getFirstPageCaptcha = async function () {
  var _0x138166 = "/DZA/CaptchaPublic/GenerateCaptcha?data=Jjar7HDMrYjqcKewUqrk06pV9GIp2EJiqBwseP9NXsvdCOgRqEwC3n3n7nAeTxEZiufiBsNFIzyNejZINhdHDxAYSHwtapYQb%2bJXbJh9QY4%3d";
  $.ajax({
    type: "GET",
    url: _0x138166,
    success: function (_0x115231) {
      var _0x51ff0c = "/DZA/CaptchaPublic/SubmitCaptcha";
      _0x115231 = {
        SelectedImages: "njvpuvd,voxplqsqz,lhnemd",
        Id: "Jjar7HDMrYjqcKewUqrk06pV9GIp2EJiqBwseP9NXsvdCOgRqEwC3n3n7nAeTxEZiufiBsNFIzyNejZINhdHDxAYSHwtapYQb+JXbJh9QY4=",
        Captcha: "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",
        __RequestVerificationToken: "CfDJ8OMsLGClZV1OjqXW0LRvyzzb8d385d-N-1afPzUhRSZqBhSFkO4IgxBJYYJ2-2Dj5kEPEwrWAp6gGHs69lVCQ6TfyO3SVg_0uKLxiy68KQ9owTCA0udvjtgvVU5Fq6ybZsBq-k2gllbNLIhRcT3-6iRDtsFjkwF7RS1pedjP72XMp8pef39igjBlKHGTguvP1g",
        "X-Requested-With": "XMLHttpRequest"
      };
      $.ajax({
        type: "POST",
        data: _0x115231,
        url: _0x51ff0c,
        dataType: "json",
        success: function (_0x3652c4) {
          $("#CaptchaData").val(_0x3652c4.captcha);
          $("#CaptchaId").val("9e06e414-0a4f-41b0-ac63-909bb58fe58c");
          console.log(_0x3652c4);
          $("#btnVerifiedAppointment").show();
        }
      });
    }
  });
};
const randomNum = (_0x50c440, _0x2dbe4a) => _0x50c440 + Math.floor(Math.random() * (_0x2dbe4a - _0x50c440));
const randomString = function (_0x1ff8cd, _0x26fd92 = false, _0x420b3b = false) {
  let _0x6e3c52 = "";
  const _0x1106cf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const _0x29333d = _0x1106cf.toLowerCase();
  const _0x5e074f = "123456789";
  let _0x1a9a28 = _0x1106cf;
  if (_0x26fd92) {
    _0x1a9a28 = _0x1106cf + _0x5e074f;
  }
  if (_0x420b3b) {
    _0x1a9a28 = _0x1106cf + _0x29333d;
  }
  if (_0x26fd92 && _0x420b3b) {
    _0x1a9a28 = _0x1106cf + _0x29333d + _0x5e074f;
  }
  const _0x4fecd3 = _0x1a9a28.length;
  let _0x5e6446 = 0;
  while (_0x5e6446 < _0x1ff8cd) {
    _0x6e3c52 += _0x1a9a28.charAt(Math.floor(Math.random() * _0x4fecd3));
    _0x5e6446 += 1;
  }
  return _0x6e3c52;
};
const waitFor = function (_0x296050) {
  return new Promise(_0x214109 => setTimeout(_0x214109, _0x296050 * 1000));
};
const isElVisable = function (_0x225f45) {
  for (let _0x9076a8 = 0; _0x9076a8 < 10; _0x9076a8++) {
    if (document?.querySelector(_0x225f45 + _0x9076a8)?.offsetParent) {
      return _0x9076a8;
    }
  }
};
const getEmailOTP = async function () {
  fakeDayValue();
  await RequestCode(event, document.getElementById("btnSenderificationCode"), false);
};
const fakeDayValue = function () {
  $("#AppointmentDate" + isElVisable("#AppointmentDate")).val("52");
  $("#AppointmentSlot" + isElVisable("#AppointmentDate")).val("52");
};
const blackList = function (_0x3a551a, _0x3830a7) {
  if (!_0x3a551a.length) {
    _0x3830a7.map((_0x1d8863, _0x186e86) => _0x3a551a.push(_0x186e86));
  }
  let _0x399594 = randomNum(0, _0x3a551a.length);
  const _0x521107 = _0x3a551a[_0x399594];
  _0x3a551a.splice(_0x3a551a.indexOf(_0x399594), 1);
  return _0x521107;
};
const selectHours = function () {
  const _0x438201 = String(isElVisable("#AppointmentDate"));
  const _0x208514 = slotDataSource?.filter(_0x3dfd4f => _0x3dfd4f.Count);
  if (!_0x208514 || !_0x208514.length) {
    return selectDay();
  }
  let _0x503d2d = blackList(hourBlack, _0x208514);
  $("#AppointmentSlot" + _0x438201).val(_0x208514[_0x503d2d].Name);
  textToDisplay += _0x208514.length + " Hours (" + (_0x503d2d + 1) + ")";
};
const selectDay = function () {
  const _0x3a71c4 = String(isElVisable("#AppointmentDate"));
  const _0x5cfc34 = allowedDates?.filter(_0x142b3f => _0x142b3f.SingleSlotAvailable);
  let _0x2660b3 = blackList(dayBlack, _0x5cfc34);
  const _0x4bc714 = _0x5cfc34[_0x2660b3];
  $("#AppointmentDate" + _0x3a71c4).val(_0x4bc714.DateText);
  $("#AppointmentDate" + _0x3a71c4).data("kendoDatePicker").value(new Date(_0x4bc714.DateTextLong));
  OnAppointmentdateChange();
  if (!dayBlack.length) {
    console.error("you tried All Days");
  }
  textToDisplay += _0x5cfc34.length + " Days (" + (_0x2660b3 + 1) + "), ";
};
const selectDate = async function () {
  const _0x18613a = String(isElVisable("#AppointmentDate"));
  const _0x3cdf7b = allowedDates?.filter(_0x1eea1e => _0x1eea1e.SingleSlotAvailable);
  textToDisplay = "";
  $("#AppointmentSlot" + _0x18613a).css("display", "inline-block");
  const _0x485c85 = function () {
    const _0x1d3c09 = document.querySelector("#appointmentDetailsDiv h5");
    _0x1d3c09.style = "font-size: 2.2rem; color: red;";
    _0x1d3c09.textContent = textToDisplay || "There is No Dates";
  };
  if (!_0x3cdf7b || !_0x3cdf7b.length) {
    return _0x485c85();
  }
  selectDay();
  await waitForOverlay();
  selectHours();
  _0x485c85();
  if (configuration.autoSubmitCalender) {
    $("#btnSubmit").click();
  }
};
const insertHtmltoDom = function (_0x39137d, _0x47f473, _0x325886 = "afterbegin") {
  const _0x2c9f7e = document.querySelector(_0x39137d);
  _0x2c9f7e.insertAdjacentHTML(_0x325886, _0x47f473);
};
const showAccDetails = function () {
  getCurrentAcount(false);
  const _0x220878 = document.querySelector("#showAccDetailsBar");
  if (_0x220878) {
    _0x220878.remove();
  }
  if (!currAcount.accName) {
    return;
  }
  insertHtmltoDom(".navbar-divider .container", "\n        <div id=\"showAccDetailsBar\" class=\"board\" style=\"position:absolute;width: 300px;height: 130px;background-color: #b24d71;text-align: left;color:white; font-size: 0.9rem\">\n        <p style=\"padding:10px 0 0 12px;margin:0;font-weight: bold;\">Account: " + currAcount.accName + "</p>\n        <p style=\"padding:0 0 0 8px;margin:0;\">Email: " + currAcount.username + "</p>\n        <p style=\"padding:0 0 0 8px;margin:0;\">Email Password: " + (currAcount.password || "unknown") + "</p>\n        <p style=\"padding:0 0 0 8px;margin:0;\">BLS Password: " + currAcount.passwordBls + "</p>\n        <p style=\"padding:0 0 0 8px;margin:0;\">Phone: " + (currAcount.phoneNum || "unknown") + "</p>\n\n      </div>\n        ", "beforeend");
  const _0x2c6382 = document.querySelector("#profileDropdown");
  const _0x18c498 = _0x2c6382.querySelector("img");
  _0x18c498.src = currAcount.imgUrl;
};
const creatBTN = function (_0x43e16d, _0x119774, _0x409766, _0x16674f = "#d4862b") {
  const _0x38c5d5 = document.querySelector(_0x119774);
  const _0x2a980c = document.createElement("button");
  _0x2a980c.textContent = _0x43e16d;
  _0x2a980c.style = "display: inline-block;background-color: " + _0x16674f + ";color: #fff;width: 200px;padding: 9px 14px;font-weight: 700;border: none;margin:8px 0 0 12px;border-radius: 20px;cursor: pointer;";
  _0x2a980c.addEventListener("click", _0x409766);
  _0x38c5d5.prepend(_0x2a980c);
  return _0x2a980c;
};
const secondPage = function () {
  const _0x5264f8 = document.querySelector("#btnSubmit");
  if (curURL === "" + BLSurl + visaTypeURL) {
    observerFun(_0x5264f8, () => {
      if (configuration.autoSubmitCaptchaPage) {
        _0x5264f8.click();
      }
    }, true);
    VerifyCaptcha();
    configeBTN();
    creatBTN("Edit", "footer", async function () {
      const _0xad776d = getItemsFromLocalstorage();
      const _0x39006c = await editWindow(currAcount);
      const _0x4c372d = _0xad776d.map(_0x49ef85 => {
        if (JSON.stringify(_0x49ef85) == JSON.stringify(currAcount)) {
          _0x49ef85.accName = _0x39006c.accountName;
          _0x49ef85.imgUrl = _0x39006c.imgUrl;
          _0x49ef85.appointmentInfo = {
            category: _0x39006c.category,
            city: _0x39006c.city,
            family: _0x39006c.family,
            visaSub: _0x39006c.visaSub,
            visaType: _0x39006c.visaType
          };
        }
        return _0x49ef85;
      });
      setEmailToLocalstorage(_0x4c372d, true);
      showAccDetails();
    }, "red");
  }
};
const imgFill = async function () {
  const _0x566e39 = await getCurrentAcount(false);
  const _0x4e1a4d = _0x566e39.imgUrl;
  if (!_0x4e1a4d) {
    return;
  }
  const _0x63b5ae = await fetch(_0x4e1a4d);
  const _0x6e3fa9 = await _0x63b5ae.blob();
  const _0x12d535 = new File([_0x6e3fa9], randomString(5) + ".jpg", {
    type: _0x6e3fa9.type
  });
  const _0x5423d5 = new FormData();
  _0x5423d5.append("file", _0x12d535);
  $.ajax({
    url: "/DZA/query/UploadProfileImage",
    type: "post",
    data: _0x5423d5,
    contentType: false,
    processData: false,
    success: function (_0x41f61a) {
      HideLoader();
      if (_0x41f61a.success) {
        $("#uploadfile-1-preview").attr("src", "/DZA/query/getfile?fileid=" + _0x41f61a.fileId);
        $("#ApplicantPhotoId").val(_0x41f61a.fileId);
      } else {
        alert("field to load image!!");
      }
    }
  });
};
function assidd(_0xfada81) {
  if (_0xfada81.success) {
    const _0xe23fc2 = _0xfada81.returnUrl;
    const _0x443f02 = _0xe23fc2.slice(0, _0xe23fc2.indexOf("?"));
    document.querySelector("#ResponseData").value = _0x443f02;
    HideLoader();
    return false;
  } else {
    HideLoader();
    if (_0xfada81.bot === true) {
      window.location.href = document.querySelector(".new-app-active")?.getAttribute("href");
      return false;
    } else if (_0xfada81.captchaFailed === true) {
      window.location.href = document.querySelector(".new-app-active")?.getAttribute("href");
      return false;
    }
    if (_0xfada81.available == false) {
      alert("Makanch Les RDVS !");
      return false;
    }
  }
}
const GoingInside = async function () {
  await waitFor(1);
  await waitForOverlay();
  const _0x3ebf03 = currAcount.appointmentInfo;
  const _0x5294d5 = _0x3ebf03?.family > 1 ? "Family&applicantsNo=" + _0x3ebf03?.family : "Individual&applicantsNo=1";
  const _0x2c5dda = _0x3ebf03?.visaType === "National Visa" && _0x3ebf03?.visaSub === "National Visa" ? true : false;
  const _0x2509fb = getid(locationData, "city");
  const _0x2903e9 = getid(visaIdData, "visaType");
  const _0x51d75b = getid(visasubIdData, "visaSub");
  const _0x2803d9 = getid(AppointmentCategoryIdData, "category");
  const _0x18a9ef = _0x2c5dda ? missionData.find(_0x4d7ef1 => _0x4d7ef1.Name === "Consulate - " + _0x2509fb).Id : "";
  const _0x28f22b = document.querySelector("#CaptchaData").value;
  const _0x5f4fa8 = _0x28f22b.replaceAll("+", "%2b").replaceAll("=", "%3d").replaceAll("/", "%2f");
  const _0xb720cc = document.querySelector("#ResponseData").value;
  if (!_0xb720cc.startsWith("/DZA/bls/")) {
    return;
  }
  const _0x452344 = _0xb720cc + "?appointmentFor=" + _0x5294d5 + "&visaType=" + _0x2903e9 + "&visaSubType=" + _0x51d75b + "&appointmentCategory=" + _0x2803d9 + "&location=" + _0x2509fb + "&missionId=" + _0x18a9ef + "&data=" + _0x5f4fa8;
  window.location.href = _0x452344;
};
const waitForOverlay = async function () {
  const _0x96ea42 = document.querySelector("#global-overlay");
  await waitFor(0.2);
  return new Promise((_0x5846fd, _0x17b5d4) => {
    const _0x5532d4 = function () {
      const _0x43545a = getComputedStyle(_0x96ea42).display;
      if (_0x43545a === "none") {
        clearInterval(_0xccf9e3);
        _0x5846fd();
      }
    };
    const _0xccf9e3 = setInterval(_0x5532d4, 500);
  });
};
const insideFn = async function () {
  if (!curURL.includes("manageappointment")) {
    return;
  }
  const _0x5e7041 = String(isElVisable("#AppointmentDate"));
  const _0xfd866a = document.querySelector("#btnVerifyEmail");
  const _0xf183e5 = document.querySelector("#uploadfile-1-preview");
  const _0x1595fe = document.querySelector("#btnVerifiedEmail");
  const _0xe044ee = document.querySelector("#EmailVerificationCode");
  const _0x2480f7 = document.querySelector("#btnVerifiedAppointment");
  const _0x208788 = document.querySelector(".validation-summary");
  const _0x3d3b8e = function () {
    _0x1595fe.removeAttribute("disabled");
    _0x1595fe.removeAttribute("style");
    _0x1595fe.innerHTML = "Manually OTP";
  };
  const _0x43d856 = async function () {
    const _0x5d2eb4 = await getAllMessages();
    SetOtpInside(_0x5d2eb4[0]);
    _0x5d2eb4.forEach(_0x1a9c35 => {
      if (_0x1a9c35.intro.includes("verification code")) {
        deleatMsg(_0x1a9c35.id);
      }
    });
  };
  const _0x287da7 = async function () {
    try {
      const _0x50586e = await navigator.clipboard.readText();
      if (_0x50586e.length !== 6) {
        return console.error("Please Copy OTP");
      }
      this.value = _0x50586e;
      if (getComputedStyle(_0x1595fe).display !== "none") {
        return console.error("OTP already pasted");
      }
      VerifyEmailCode(event, this);
      await waitForOverlay();
      $("#btnVerifyAppointment").click();
    } catch (_0x310d5b) {
      console.error(_0x310d5b);
    }
  };
  const _0x4cd190 = async function () {
    const _0x567ad0 = _0x208788.textContent;
    if (_0x567ad0 === "" || counter > 30) {
      return console.error("No error");
    }
    counter++;
    if (_0x567ad0.includes("Invalid captcha") || _0x567ad0.includes("Please select") || _0x567ad0.includes("Please enter a valid appointment date and slot") || _0x567ad0.includes("80004005")) {
      if (hourBlack.length === 0) {
        return;
      }
      await waitForOverlay();
      selectHours();
      await waitFor(1);
      HideError();
      $("#btnSubmit").click();
    }
  };
  creatBTN("Refreach: " + _0x5e7041, "#appointmentDetailsDiv", () => {
    LoadAppointmentDates(_0x5e7041, _0x5e7041);
  });
  creatBTN("Select Day", "#appointmentDetailsDiv", selectDate, "green");
  _0x1595fe.addEventListener("click", _0x43d856);
  _0xe044ee.addEventListener("click", _0x287da7);
  observerFun(_0x208788, _0x4cd190);
  let _0x25163a = 1;
  const _0x3d8308 = setInterval(async function () {
    await waitForOverlay();
    hideModals();
    $("#btnVerifyEmail").removeAttr("disabled");
    $("#btnSenderificationCode").removeAttr("disabled");
    $("#btnVerifyAppointment").removeAttr("disabled");
    if (!_0xf183e5.src.includes("avatar") && _0xfd866a?.getAttribute("style")?.includes("none") && _0x25163a === 1 && !_0x2480f7?.getAttribute("style")?.includes("none")) {
      _0x25163a++;
      selectDate();
      await waitForOverlay();
      clearInterval(_0x3d8308);
    }
    ;
  }, 1000);
  await getCurrentAcount();
  await waitForOverlay();
  imgFill();
  showButtons();
  await waitForOverlay();
  if (currAcount.password) {
    _0x3d3b8e();
    mailjs.on("arrive", onMsgArrives);
  }
  await getEmailOTP();
  await waitForOverlay();
  await getFirstPageCaptcha();
  creatBTN("10%", "main", function () {
    if (confirm("sure !!")) {
      document.querySelector("#btnSubmit").click();
    }
  });
  creatBTN("25%", "main", function () {
    if (confirm("sure !!")) {
      onAgree();
    }
  });
  creatBTN("Confirm Payment", "main", function () {
    OnPaymentConfirm();
  });
};
