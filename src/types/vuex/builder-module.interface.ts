// /** datos de una encuesta */
// export interface Poll {
//   /** id de la nueva encuesta */
//   id: number;
//   /** nombre nueva encuesta */
//   name: string;
//   /** número de veces en las que se ha realizado esta encuesta */
//   total: number;
//   personalQuestions: PersonalQuestion[];
//   questions: {
//     /** valor único para indentificar */
//     id: number;
//     /** pregunta a mostrar */
//     question: string;
//     options: OptionsRecords[];
//   }[];
// }

// /** datos de una encuesta a construir */
// export interface PollBuilder {
//   /** id de la nueva encuesta */
//   id: number;
//   /** nombre nueva encuesta */
//   name: string;
//   /** número de veces en las que se ha realizado esta encuesta */
//   total: number;
//   personalQuestions: PersonalQuestion[];
//   questions: {
//     /** valor único para indentificar */
//     id: number;
//     /** pregunta a mostrar */
//     question: string;
//     options: OptionsBuilder[];
//   }[];
// }

// /** datos más personales del encuestado, para poder identificar masas */
// export interface PersonalQuestion {
//   /** valor único para indentificar */
//   id: number;
//   /** pregunta a mostrar */
//   question: string;
//   /** opciones para responder la pregunta */
//   options: Options[];
// }

// /** opciones para responder */
// export interface Options {
//   /** valor único para indentificar */
//   id: number;
//   /** pregunta a mostrar */
//   label: string;
//   /** cantidad de veces que se seleccionó  */
//   count: number;
// }

// /** opciones para responder con posibles preguntas hijas e historial de preguntas personales seleccionadas */
// export interface OptionsRecords extends Options {
//   /** registro de cómo se respondieron las preguntas personales cuando se seleccionó esta opción en esta pregunta */
//   recordsPersonalQuestions: {
//     /** id de la pregunta personal */
//     id: number;
//     /** opciones de la actual pregunta personal*/
//     options: {
//       /** id de la opción que se seleccionó */
//       id: number;
//       /** cantidad de veces que se seleccionó  */
//       count: number;
//     };
//   }[];
//   /** posibles preguntas hijas */
//   children?: Options[];
// }

// /** opciones para responder con posibles preguntas hijas */
// export interface OptionsBuilder extends Options {
//   /** posibles preguntas hijas */
//   children?: Options[];
// }

/** estado del módulo «builder» */
export interface StateBuilderModule {
  /** nueva encuesta a construir */
  poll: Poll | null;
  /** pregunta hija utilizada actualmente */
  itemChild: QuestionChild | null;
}

/** encuesta */
export interface Poll extends PollData {
  id: number;
  name: string;
}

/** datos reutilizables de una encuesta */
export interface PollData {
  /** preguntas personales */
  personal: PersonalQuestion[];
  /** preguntas propias de la encuesta */
  questions: Question[];
  /** observaciones */
  observations: string[];
}

/** pregunta personal */
export interface PersonalQuestion {
  id: number;
  question: string;
  options: PersonalOption[];
}

/** datos de una pregunta */
export interface Question {
  id: number;
  question: string;
  options: OptionChildren[];
  /** cuando se agrega un input a una opción para respuesta personalizada */
  others: OptionOther[];
}

/** respuesta personalizada, ingresada por el usuario */
export interface OptionOther {
  /** id de la opción a la cual hace referencia */
  idOption: number;
  /** valores que se van añadiendo */
  values: string[];
}

/** opciones básicas */
export interface Option {
  id: number;
  label: string;
  count: number;
}

/** preguntas hijas */
export interface QuestionChild {
  id: number;
  question: string;
  count: number;
  options: Option[];
}

/** opciones con preguntas hias */
export interface OptionChildren extends Option {
  children: QuestionChild[];
}

/** opciones de las preguntas personales (cada una tendrá una encuesta) */
export interface PersonalOption extends Option {
  /** datos de una encuesta completa por cada opción de todas las preguntas personales */
  poll: PollData;
}
