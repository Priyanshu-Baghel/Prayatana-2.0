const backendNodeDomain = "https://prayatana-2-0.vercel.app/";
const backendPythonDomain = "http://127.0.0.1:5001/";

const SummaryApi = {
    signUP : {
        url : `${backendNodeDomain}api/auth/signup`,
        method : "POST",
        done : "yes",
    },
    signIN : {
        url : `${backendNodeDomain}api/auth/signin`,
        method : "POST",
        done : "yes",
    },
    user : {
        url : `${backendNodeDomain}api/auth/user`,
        method : "GET",
        done : "yes",
    },
    contact : {
        url : `${backendNodeDomain}api/form/contact`,
        method : "POST",
        done : "yes",
    },
    emailSend : {
        url : `${backendNodeDomain}sendEmail`,
        method : "POST",
        done : "yes",
    },
    profile : {
        url : `${backendNodeDomain}api/for/complete_profile`,
        method : "POST",
        done : "yes",
    },
    getProfile : {
        url : `${backendNodeDomain}api/for/getProfile`,
        method : "POST",
    },
    payment : {
        url : `${backendNodeDomain}api/payment`,
        method : "POST",
        done : "yes",
    },
    pricing :{
        url : `${backendNodeDomain}api/pricing`,
        method : "GET",
        done : "yes",
    },
    Admin : {
        getAllUsers : {
            url : `${backendNodeDomain}api/admin/getAllUsers`,
            method : "GET",
            done : "yes",
        },
        getAllMessages : {
            url : `${backendNodeDomain}api/admin/getAllMessages`,
            method : "GET",
            done : "yes",
        },
        getAllComplaint : {
            url : `${backendNodeDomain}api/complaints/`,
            method : "GET",
            done : "yes",
        },
        addOrganization : {
            url : `${backendNodeDomain}api/organizations/`,
            method : "POST",
            done : "yes",
        },
        update : {
            url : `${backendNodeDomain}api/admin/users/:id`,
            method : "PUT",
            done : "yes",
        },
        sendAcknowledgment : {
            url : `${backendNodeDomain}/api/admin/messages/acknowledge/:id`,
            method : "POST",
            done : "yes",
        }
    },
    subscription : {
        url : `${backendNodeDomain}api/Subscription/getSubscription`,
        method : "POST",
        done : "yes",
    },
    complaint : {
        url : `${backendNodeDomain}api/complaint/submit`,
        method : "POST",
        done : "yes",
    }
   
}

export default SummaryApi