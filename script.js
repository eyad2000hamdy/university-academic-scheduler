// =========================
// الرسائل التحفيزية
// =========================
const quotes = [
"كل خطوة صغيرة تقربك من حلمك.",
"النجاح يبدأ من الاستمرار.",
"كل يوم فرصة جديدة للتقدم.",
"لا يوجد مجهود يضيع هباءً.",
"أحلامك تستحق كل هذا التعب.",
"الراحة تأتي بعد الإنجاز.",
"كوني فخورة بكل خطوة تخطينها.",
"العلم يفتح أبوابًا لا تُغلق.",
"ابتسامتك تجعل الطريق أسهل.",
"المستقبل يُبنى اليوم.",
"كل صفحة تذاكرينها تقربك من هدفك.",
"الإصرار يصنع المستحيل.",
"النجاح يحب المجتهدين.",
"ثقي بنفسك دائمًا.",
"كل تحدٍ يحمل فرصة جديدة.",
"البداية أهم من الكمال.",
"الإنجازات الكبيرة تبدأ بمحاولات صغيرة.",
"اصنعي لنفسك قصة نجاح جميلة.",
"لا تستسلمي مهما كان الطريق طويلًا.",
"القوة الحقيقية هي الاستمرار.",
"كل دقيقة تركيز تصنع فرقًا.",
"العلم أجمل استثمار في الحياة.",
"كوني أفضل من الأمس فقط.",
"الأمل يصنع المعجزات.",
"لا تقارني رحلتك بأحد.",
"كل تعب اليوم راحة الغد.",
"المعرفة نور لا ينطفئ.",
"استمتعي برحلة التعلم.",
"كل إنجاز يستحق الاحتفال.",
"الطموح بداية كل نجاح.",
"أنتِ أقرب لهدفك مما تظنين.",
"الإيمان بالنفس نصف الطريق.",
"كل يوم يحمل فرصة جديدة للتألق.",
"النجاح يحتاج صبرًا أكثر من الحظ.",
"التنظيم يجعل كل شيء أسهل.",
"المحاولة دائمًا أفضل من الندم.",
"اجعلي حلمك يقود خطواتك.",
"كل تحدٍ يزيدك قوة.",
"أنتِ قادرة على تجاوز الصعاب.",
"الاجتهاد يترك أثرًا جميلًا.",
"كل فكرة جديدة بداية لإنجاز جديد.",
"لا تخافي من البداية.",
"الهدوء يساعد على الإبداع.",
"المثابرة تصنع الفرق.",
"العقل الممتلئ بالعلم لا يتوقف عن النمو.",
"كل إنجاز يبدأ بقرار.",
"كوني واثقة من قدراتك.",
"المستقبل يبتسم لمن يعمل لأجله.",
"اجعلي الشغف دليلك.",
"كل نجاح يبدأ بخطوة."
];

function showMessage() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const messageBox = document.getElementById("message-box");
  if (messageBox) {
    messageBox.innerText = quotes[randomIndex];
  }
}

// =========================
// المحاضرات
// =========================
function addLecture() {
  const subject = document.getElementById("lecture-subject").value.trim();
  const day = document.getElementById("lecture-day").value.trim();
  const time = document.getElementById("lecture-time").value;
  const room = document.getElementById("lecture-room").value.trim();
  const doctor = document.getElementById("lecture-doctor").value.trim();
  const date = document.getElementById("lecture-date").value;

  if (subject && day && time && room && doctor && date) {
    const lectures = JSON.parse(localStorage.getItem("lectures")) || [];

    lectures.push({ subject, day, time, room, doctor, date });
    localStorage.setItem("lectures", JSON.stringify(lectures));

    loadLectures();
    updateNextLecture();

    document.getElementById("lecture-subject").value = "";
    document.getElementById("lecture-day").value = "";
    document.getElementById("lecture-time").value = "";
    document.getElementById("lecture-room").value = "";
    document.getElementById("lecture-doctor").value = "";
    document.getElementById("lecture-date").value = "";
  } else {
    alert("من فضلك املئي جميع بيانات المحاضرة");
  }
}

function loadLectures() {
  const tbody = document.querySelector("#lectures-table tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  const lectures = JSON.parse(localStorage.getItem("lectures")) || [];

  lectures.forEach((lecture, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${lecture.subject}</td>
      <td>${lecture.day}</td>
      <td>${lecture.time}</td>
      <td>${lecture.room}</td>
      <td>${lecture.doctor}</td>
      <td><button class="delete-btn" onclick="deleteLecture(${index})">حذف</button></td>
    `;
    tbody.appendChild(row);
  });
}

function deleteLecture(index) {
  const lectures = JSON.parse(localStorage.getItem("lectures")) || [];
  lectures.splice(index, 1);
  localStorage.setItem("lectures", JSON.stringify(lectures));

  loadLectures();
  updateNextLecture();
}

function updateNextLecture() {
  const lectures = JSON.parse(localStorage.getItem("lectures")) || [];
  const countdownElement = document.getElementById("lecture-countdown");
  if (!countdownElement) return;

  const now = new Date();

  const upcomingLectures = lectures
    .filter(lecture => lecture.date && lecture.time)
    .map(lecture => ({
      ...lecture,
      dateTime: new Date(`${lecture.date}T${lecture.time}`)
    }))
    .filter(lecture => lecture.dateTime > now)
    .sort((a, b) => a.dateTime - b.dateTime);

  if (upcomingLectures.length === 0) {
    countdownElement.innerText = "لا توجد محاضرات قادمة";
    return;
  }

  const nextLecture = upcomingLectures[0];
  const diff = nextLecture.dateTime - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  countdownElement.innerText =
    `باقي ${days} يوم و ${hours} ساعة و ${minutes} دقيقة على محاضرة ${nextLecture.subject}`;
}

// =========================
// الامتحانات
// =========================
function addExam() {
  const name = document.getElementById("exam-name").value.trim();
  const date = document.getElementById("exam-date").value;
  const time = document.getElementById("exam-time").value;

  if (name && date && time) {
    const exams = JSON.parse(localStorage.getItem("exams")) || [];

    exams.push({ name, date, time });
    localStorage.setItem("exams", JSON.stringify(exams));

    loadExams();
    updateNextExam();

    document.getElementById("exam-name").value = "";
    document.getElementById("exam-date").value = "";
    document.getElementById("exam-time").value = "";
  } else {
    alert("من فضلك املئي جميع بيانات الامتحان");
  }
}

function loadExams() {
  const tbody = document.querySelector("#exams-table tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  const exams = JSON.parse(localStorage.getItem("exams")) || [];

  exams.forEach((exam, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${exam.name}</td>
      <td>${exam.date}</td>
      <td>${exam.time}</td>
      <td><button class="delete-btn" onclick="deleteExam(${index})">حذف</button></td>
    `;
    tbody.appendChild(row);
  });
}

function deleteExam(index) {
  const exams = JSON.parse(localStorage.getItem("exams")) || [];
  exams.splice(index, 1);
  localStorage.setItem("exams", JSON.stringify(exams));

  loadExams();
  updateNextExam();
}

function updateNextExam() {
  const exams = JSON.parse(localStorage.getItem("exams")) || [];
  const countdownElement = document.getElementById("exam-countdown");
  if (!countdownElement) return;

  const now = new Date();

  const upcomingExams = exams
    .filter(exam => exam.date && exam.time)
    .map(exam => ({
      ...exam,
      dateTime: new Date(`${exam.date}T${exam.time}`)
    }))
    .filter(exam => exam.dateTime > now)
    .sort((a, b) => a.dateTime - b.dateTime);

  if (upcomingExams.length === 0) {
    countdownElement.innerText = "لا توجد امتحانات قادمة";
    return;
  }

  const nextExam = upcomingExams[0];
  const diff = nextExam.dateTime - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  countdownElement.innerText =
    `${nextExam.name} - باقي ${days} يوم`;
}

// =========================
// الملاحظات
// =========================
function saveNotes() {
  const notes = document.getElementById("notes-text");
  if (notes) {
    localStorage.setItem("notes", notes.value);
  }
}

function loadNotes() {
  const notes = document.getElementById("notes-text");
  if (notes) {
    notes.value = localStorage.getItem("notes") || "";
  }
}

// =========================
// مهام المذاكرة
// =========================
function addTask() {
  const taskInput = document.getElementById("study-task");
  if (!taskInput) return;

  const task = taskInput.value.trim();

  if (task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    loadTasks();
  }
}

function loadTasks() {
  const list = document.getElementById("tasks-list");
  if (!list) return;

  list.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task}
      <button class="delete-btn" onclick="deleteTask(${index})">حذف</button>
    `;
    list.appendChild(li);
  });
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  loadTasks();
}

// =========================
// مؤقت المذاكرة بالوقت الذي يكتبه المستخدم
// =========================
let studyTimer;
let timeLeft = 0;

function updateTimerDisplay() {
  const display = document.getElementById("timer-display");
  if (!display) return;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  display.innerText =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  const minutesInput = document.getElementById("study-minutes");

  if (timeLeft === 0) {
    const minutes = parseInt(minutesInput.value);

    if (!minutes || minutes <= 0) {
      alert("من فضلك اكتبي عدد الدقائق أولًا");
      return;
    }

    timeLeft = minutes * 60;
    updateTimerDisplay();
  }

  clearInterval(studyTimer);

  studyTimer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(studyTimer);
      playAlarm();
      alert("انتهى وقت المذاكرة 😊");
      return;
    }

    timeLeft--;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(studyTimer);
}

function resetTimer() {
  clearInterval(studyTimer);
  timeLeft = 0;
  updateTimerDisplay();

  const minutesInput = document.getElementById("study-minutes");
  if (minutesInput) {
    minutesInput.value = "";
  }
}

// =========================
// المنبه
// =========================
function setAlarm() {
  const alarmTime = document.getElementById("alarm-time");
  const status = document.getElementById("alarm-status");

  if (!alarmTime || !alarmTime.value) {
    if (status) status.innerText = "اختاري وقتًا للمنبه";
    return;
  }

  if (status) {
    status.innerText = `تم ضبط المنبه على ${alarmTime.value}`;
  }

  const checkAlarm = setInterval(() => {
    const now = new Date();
    const currentTime =
      `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    if (currentTime === alarmTime.value) {
      playAlarm();
      alert("حان وقت المذاكرة 📚");
      clearInterval(checkAlarm);
    }
  }, 1000);
}

function playAlarm() {
  const audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-07.mp3");
  audio.play();
}

// =========================
// تحميل البيانات عند فتح الصفحة
// =========================
window.onload = function () {
  loadLectures();
  loadExams();
  loadNotes();
  loadTasks();
  updateNextLecture();
  updateNextExam();
  updateTimerDisplay();
};