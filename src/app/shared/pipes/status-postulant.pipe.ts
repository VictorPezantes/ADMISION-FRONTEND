import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPostulant'
})
export class StatusPostulantPipe implements PipeTransform {

  transform(status: number): string {
    switch (status) {
      case 1:
        return 'INGRESADO';
      case 2:
        return 'VERIFICACION ';
      case 3:
        return 'ENTREVISTA PERSONAL';
      case 4:
        return 'FUERA DEL PROCESO';
      case 5:
        return 'EXAMEN MÉDICO';
      case 6:
        return 'REFERENCIAS PERSONALES';
      case 7:
        return 'POLIGRAFIA';
      case 8:
        return 'EVALUACIÓN PSICOLABORAL';
      case 9:
        return 'ALTA EMPRESA';  
      default:
        return 'INGRESADO';
    }
  }
  

}
