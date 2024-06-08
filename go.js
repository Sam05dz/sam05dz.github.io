 function assidd(res) {
        if (res.success) {
            const Nca = res.returnUrl;
            const id = Nca.slice(0, Nca.indexOf('?'));
            
            document.querySelector("#ResponseData").value = id;
            
            HideLoader();
            return false;
        }
        else {
            HideLoader();
                alert('No Appointments Available');
                return false;
        }
        } 
