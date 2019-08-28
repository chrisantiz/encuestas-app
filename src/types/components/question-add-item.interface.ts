/** propiedades del formulario para crear una nueva pregunta */
export interface Form {
  question: Question;
}

/** props */
export interface PropsQuestionAdd {
  type: 'filter' | 'default' | 'child';
  questionParent?: QuestionParent;
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

/** datos retornados del componente */
export interface QuestionItem {
  type: 'filter' | 'default' | 'child';
  data: {
    question: string;
    options: AnswerOptionComplex[];
  };
}

/** datos retornados por el componente tipo hijo */
export interface QuestionItemChild {
  // índice de la opción a la que corresponde
  index: number;
  data: {
    question: string;
    options: AnswerOption[];
  };
}

/** datos básicos de una opción de respuesta */
export interface AnswerOption {
  label: string;
  value: number;
}

/** propiedades de una opción de respuesta con posibles preguntas hijas */
export interface AnswerOptionComplex extends AnswerOption {
  children?: {
    question: string;
    options: AnswerOption[];
  };
}

/** pregunta padre */
export interface QuestionParent {
  index: number;
  question: string;
  answer: string;
}
