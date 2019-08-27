/** propiedades del formulario para crear una nueva pregunta */
export interface Form {
  question: Question;
}

/** propiedades de una pregunta */
export interface Question {
  title: string;
  options: string[];
}

/** diálogos del componente */
export interface QuestionAddDialog {
  editOption: DialogEditOption;
  deleteOption: boolean;
  parent: boolean;
}

/** diálogo para editar una opción (posible respuesta) */
export interface DialogEditOption {
  open: boolean;
  text: string;
  index: number;
}

/** props del componente */
export interface QuestionAddProps {
  type: 'filter' | 'default';
  title?: string;
}
