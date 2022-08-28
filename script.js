var studentAPI = "http://localhost:3001/students"

function start() {
    getStudentsList(renderStudent)
    handleWithStudents()
}

start()

function getStudentsList(callback)  {
    fetch(studentAPI)
        .then(function(response){
            return response.json()
        })
        .then(callback)
}

function createNewStudents(data) {
    fetch(studentAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(function(response){
        return response.json()
    })         
}

function handleDeleteStudent(id) {
    fetch(studentAPI + "/" + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(() => {
        var studentInfo = document.querySelector('.student-'+ id)
        studentInfo.remove()
    })
}


function renderStudent(students) {
    var listStudents = document.getElementById("list-students")
    var htmls = students.map(function(student){
        return `<li class="student-${student.id}">
            <h4>${student.name}</h4>
            <p>${student.age}</p>
            <p>${student.sex}</p>
            <p>${student.class}</p>
            <button onclick="handleDeleteStudent(${student.id})">Xóa</button>
        </li>`
    })
    listStudents.innerHTML = htmls.join("___________________")
}

function handleWithStudents() {
    var postBtn = document.querySelector("#post-btn")
    postBtn.onclick = function(){ 
        var name = document.querySelector("input[name ='name']").value
        var age = document.querySelector("input[name ='age']").value
        var sex = document.querySelector("input[name ='sex']").value
        var classStudent = document.querySelector("input[name ='class']").value
        
        var dataStudent = {
            name: name,
            age: age,
            sex: sex,
            class: classStudent
        }

        createNewStudents(dataStudent)
    }
}







