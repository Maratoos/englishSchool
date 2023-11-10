import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserAnswer } from "../../models/models";

type TypeInitialState = {
    currentLevel: string | null,
    correctAnswers: number;
    userAnswers: Array<IUserAnswer>
}

const initialState: TypeInitialState = {
    userAnswers: [],
    correctAnswers: 0,
    currentLevel: null,
};

export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setUserAnswers(state, action: PayloadAction<IUserAnswer>) {
            state.userAnswers.push(action.payload)
        },
        countCorrectAnswers(state) {
            state.correctAnswers = state.userAnswers.filter(item => item.answerIsCorrect === true).length
            localStorage.setItem("correctAnswers", JSON.stringify(state.correctAnswers))
        },
        countUserLevel(state) {
            if (state.correctAnswers < 6) {
                state.currentLevel = "Beginner";
                localStorage.setItem("currentLevel", state.currentLevel)
            } else if (state.correctAnswers >= 7 && state.correctAnswers <= 13) {
                state.currentLevel = "Elementary";
                localStorage.setItem("currentLevel", state.currentLevel)
            } else if (state.correctAnswers >= 14 && state.correctAnswers <= 20) {
                state.currentLevel = "Pre-Intermediate";
                localStorage.setItem("currentLevel", state.currentLevel)
            } else if (state.correctAnswers >= 21 && state.correctAnswers <= 25) {
                state.currentLevel = "Intermediate";
                localStorage.setItem("currentLevel", state.currentLevel)
            } else {
                state.currentLevel = "Upper-Intermediate";
                localStorage.setItem("currentLevel", state.currentLevel)
            }
        },
        setDefaultValues(state) {
            const savedCorrectAnswers = localStorage.getItem("correctAnswers")

            state.correctAnswers = savedCorrectAnswers ? JSON.parse(savedCorrectAnswers) : 0
            state.currentLevel = localStorage.getItem("currentLevel") || null
            state.userAnswers = []
        }
    },
});

export default quizSlice.reducer;
export const { setUserAnswers, setDefaultValues, countCorrectAnswers, countUserLevel } = quizSlice.actions
