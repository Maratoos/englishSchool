import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserAnswer } from "../../models/models";

type TypeInitialState = {
    currentLevel: string | null,
    correctAnswers: number;
    userAnswers: Array<IUserAnswer>
}

const getCookie = (name: string): string | undefined => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
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
            document.cookie = `${encodeURIComponent("correctAnswers")}=${encodeURIComponent(state.correctAnswers)}; path=/; max-age=2678400`
        },
        countUserLevel(state) {
            if (state.correctAnswers < 6) {
                state.currentLevel = "Beginner";
            } else if (state.correctAnswers >= 7 && state.correctAnswers <= 13) {
                state.currentLevel = "Elementary";
            } else if (state.correctAnswers >= 14 && state.correctAnswers <= 20) {
                state.currentLevel = "Pre-Intermediate";
            } else if (state.correctAnswers >= 21 && state.correctAnswers <= 25) {
                state.currentLevel = "Intermediate";
            } else {
                state.currentLevel = "Upper-Intermediate";
            }
            document.cookie = `${encodeURIComponent("currentLevel")}=${encodeURIComponent(state.currentLevel)}; path=/; max-age=2678400`
        },
        setDefaultValues(state) {
            const savedCorrectAnswers = getCookie("correctAnswers")
            const savedCurrentLevel = getCookie("currentLevel")

            state.correctAnswers = savedCorrectAnswers ? Number(savedCorrectAnswers) : 0
            state.currentLevel = savedCurrentLevel || null
            state.userAnswers = []
        }
    },
});

export default quizSlice.reducer;
export const { setUserAnswers, setDefaultValues, countCorrectAnswers, countUserLevel } = quizSlice.actions
