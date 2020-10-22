import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Students } from './students.js';
import { dataStudents } from './dataStudents.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let estudiantesTbody: HTMLElement = document.getElementById('estudiantes')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByNumber: HTMLElement = document.getElementById(
	'button-filterByNumber'
)!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const inputSearchBoxMin: HTMLInputElement = <HTMLInputElement>(
	document.getElementById('search-boxMin')!
);
const inputSearchBoxMax: HTMLInputElement = <HTMLInputElement>(
	document.getElementById('search-boxMax')!
);

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByNumber.onclick = () => buscarPorRango();

renderCoursesInTable(dataCourses);
ponerDatosStudent(dataStudents);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
function ponerDatosStudent(students: Students[]): void {
  console.log('Desplegando estudiante');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.codigo}}</td>
                           <td>${student.cedula}</td>
                           <td>${student.direccion}</td>
                           <td>${student.edad}</td>
                           <td>${student.telefono}</td>`;
    estudiantesTbody.appendChild(trElement);
  });
}

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}
function buscarPorRango() {
	let min = inputSearchBoxMin.valueAsNumber;
	min = min == null ? 0 : min;
	let max = inputSearchBoxMax.valueAsNumber;
	max = max == null ? 0 : max;
	clearCoursesInTable();
	let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
	renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(min: number, max: number, courses: Course[]) {
	return min === 0 && max === 0
		? dataCourses
		: courses.filter((c) => c.credits >= min && c.credits <= max);
}