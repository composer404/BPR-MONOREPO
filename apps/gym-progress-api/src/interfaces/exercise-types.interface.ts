import { ExerciseTypeInput } from 'src/models/exercise-types.model';

export abstract class IExerciseTypesService {
    abstract getAllExerciseTypes();
    abstract getExerciseTypeById(id: string);
    abstract getExerciseTypeByActivityId(activityId: string);
    abstract addExerciseType(input: ExerciseTypeInput);
    abstract deleteExerciseType(id: string);
    abstract initialLoad(input: ExerciseTypeInput[]);
}
