var gradewayData = null;
var gradewayTable = undefined;
var gradewayLogin = "";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementsByName("gradeway-username")[0].focus();
    document
        .getElementById("gradeway-request")
        .addEventListener("click", () => {
            let gradewayUsername =
                document.getElementsByName("gradeway-username")[0].value;
            let gradewayPassword =
                document.getElementsByName("gradeway-password")[0].value;
            document.getElementsByName("gradeway-password")[0].value = "";

            gradewayUsername = gradewayUsername.trim().toUpperCase();
            gradewayPassword = gradewayPassword.trim().toUpperCase();

            if (gradewayUsername.length > 0 && gradewayPassword.length > 0) {
                if (gradewayData == null) {
                    gradewayTable.setData([]);
                    gradewayLogin = "";
                    return 1;
                }

                if (gradewayLoginCheck(gradewayUsername, gradewayPassword)) {
                    document.getElementById("gradeway-01").innerText = "";
                    gradewayLogin = gradewayUsername;
                    const data = retriveGradewayData(gradewayUsername);

                    if (gradewayTable != undefined) {
                        gradewayTable.setData(data);
                    } else {
                        document.getElementById("gradeway-01").innerText =
                            "Oops! Something unexpected happened. Please reload the page once more.";
                        gradewayTable.setData([]);
                        gradewayLogin = "";
                    }
                } else {
                    document.getElementById("gradeway-01").innerText =
                        "Your login credentials are incorrect. Please double-check your username and password, and try again.";
                    gradewayTable.setData([]);
                    gradewayLogin = "";
                }
            } else {
                document.getElementById("gradeway-01").innerText =
                    "It seems like some required credentials are missing or incomplete.";
                gradewayTable.setData([]);
                gradewayLogin = "";
                return 1;
            }
        });

    fetch("../databases/gradeway.json")
        .then((response) => {
            if (!response.ok) {
                document.getElementById("gradeway-01").innerText =
                    "An issue occurred while communicating with the source. Please refresh the page and try again.";
                gradewayTable.setData([]);
                gradewayLogin = "";
                throw new Error("Network response error");
            }

            return response.json();
        })
        .then((data) => {
            gradewayData = data;
        })
        .catch((error) => {
            console.error(
                "There was an error during the data retrieval process",
                error
            );
            document.getElementById("gradeway-01").innerText =
                "Oops! Something unexpected happened. Please attempt your request once more.";
            gradewayTable.setData([]);
            gradewayLogin = "";
        });
});

document.addEventListener("DOMContentLoaded", () => {
    gradewayTable = new Tabulator("#gradeway-table", {
        printAsHtml: true,
        printStyled: true,
        printHeader:
            "<i>This document is not an official issuance by ximply<i>",
        printFooter:
            "<i>This document is not an official issuance by ximply<i>",
        data: [],
        layout: "fitDataFill",
        columns: [
            { title: "#", field: "no", resizable: false },
            { title: "Evaluation Name", field: "name", resizable: false },
            {
                title: "Grade",
                field: "grade",
                resizable: false,
                headerSort: false,
            },
            {
                title: "Achievement",
                field: "achievement",
                formatter: "star",
                resizable: false,
                formatterParams: {
                    stars: 5,
                },
            },
            { title: "Hold Date", field: "date", resizable: false },
            {
                title: "Evaluation Domain",
                field: "domain",
                resizable: false,
                headerSort: false,
            },
            {
                title: "Submission Type",
                field: "submission",
                resizable: false,
                headerSort: false,
            },
            {
                title: "Due Flag",
                field: "due",
                resizable: false,
                headerSort: false,
            },
        ],
        autoResize: true,
    });

    document
        .getElementById("download-pdf-button")
        .addEventListener("click", function () {
            if (gradewayLogin == "") {
                return 0;
            }
            const today = new Date();

            const day = String(today.getDate()).padStart(2, "0");
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const year = today.getFullYear();

            const formattedDate = `${day}-${month}-${year}`;

            gradewayTable.download(
                "pdf",
                `${gradewayLogin}@ximply (${formattedDate}).pdf`,
                {
                    orientation: "landscape",
                    title: `${gradewayLogin}@ximply (This document is not an official issuance by ximply)`,
                }
            );
        });

    document
        .getElementById("print-pdf-button")
        .addEventListener("click", function () {
            if (gradewayLogin == "") {
                return 0;
            }
            document.title = `${gradewayLogin}@ximply Gradeway report`;
            gradewayTable.print(false, true);
            document.title = `Gradeway - ximply | Learn with ease on ximply`;
        });

    document.addEventListener("keyup", function (event) {
        // Check if the Enter key (key code 13) was pressed
        if (event.keyCode === 13) {
            // Trigger a click event on the button
            document.getElementById("gradeway-request").click();
        }
    });
});

function gradewayLoginCheck(username, password) {
    let gradewayLogin = false;
    Object.keys(gradewayData.credentials).forEach((element) => {
        console.log(
            username,
            CryptoJS.AES.decrypt(
                gradewayData.credentials[element].password,
                "ximply$1#9T&zRwQ@5*pXuY"
            ).toString(CryptoJS.enc.Utf8)
        );
        if (
            element.toUpperCase() == username &&
            CryptoJS.AES.decrypt(
                gradewayData.credentials[element].password,
                "ximply$1#9T&zRwQ@5*pXuY"
            )
                .toString(CryptoJS.enc.Utf8)
                .toUpperCase() == password
        ) {
            gradewayLogin = true;
        }
    });

    return gradewayLogin;
}

function retriveGradewayData(username) {
    let data = [];
    let jsonTemplate = {
        no: "",
        name: "",
        grade: "",
        achievement: "",
        date: "",
        domain: "",
        submission: "",
        due: "",
    };

    let templateNo = 1;
    Object.keys(gradewayData.grading).forEach((evaluationuuid) => {
        gradewayData.grading[evaluationuuid].forEach((student) => {
            if (student.index.toUpperCase() == username) {
                const evaluationDetails =
                    gradewayData.evaluation[evaluationuuid];

                jsonTemplate.no = templateNo;
                jsonTemplate.name = evaluationDetails["name"];
                jsonTemplate.grade = student.grade.toUpperCase();
                jsonTemplate.achievement = student.achievement;
                jsonTemplate.date = evaluationDetails["date"];
                jsonTemplate.domain = evaluationDetails["domain"];
                jsonTemplate.submission =
                    student.submission == true ? "Physical" : "Online";
                jsonTemplate.due = student.due == true ? "Yes" : "No";
                data.push(jsonTemplate);
                jsonTemplate = {
                    no: "",
                    name: "",
                    grade: "",
                    achievement: "",
                    date: "",
                    domain: "",
                    submission: "",
                    due: "",
                };
            }

            templateNo++;
        });
    });

    return data;
}
