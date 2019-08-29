/** state del módulo «builder» */
export interface BuilderModule {
  newPoll: {
    /** id de la nueva encuesta */
    id: number;
    /** nombre nueva encuesta */
    name: string;
    /** número de veces en las que se ha realizado esta encuesta */
    total: number;
    /** datos más personales del encuestado, para poder identificar masas */
    personalQuestions: {
      /** valor único para indentificar */
      id: number;
      /** pregunta a mostrar */
      question: string;
      /** opciones para responder */
      options: {
        id: number;
        label: string;
        count: number;
      }[];
    }[];
    /** preguntas de la encuesta */
    questions: {
      /** valor único para indentificar */
      id: number;
      /** pregunta a mostrar */
      question: string;
      /** opciones para responder la pregunta */
      options: {
        /** valor único para indentificar */
        id: number;
        /** pregunta a mostrar */
        label: string;
        /** contador de cuántas veces se ha seleccionado esta opción */
        count: number;
        /** registro de cómo se respondieron las preguntas personales cuando se seleccionó esta opción en esta pregunta */
        recordsPersonalQuestions: {
          /** id de la pregunta personal */
          id: number;
          /** opciones de la actual pregunta personal*/
          options: {
            /** id de la opción que se seleccionó */
            id: number;
            /** cantidad de veces que se seleccionó  */
            count: number;
          }[];
        }[];
        /** posibles preguntas hijas */
        children?: {
          id: number;
          label: string;
          count: number;
        }[];
      }[];
    }[];
  };
}
