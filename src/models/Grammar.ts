/**
 * Represents the result of a grammar check.
 */
interface GrammarCheckResult {
    isCorrect: boolean;
    errors: GrammarError[];
    score: number;
}

interface GrammarError {
    line: number;
    column: number;
    message: string;
    type: 'spelling' | 'grammar' | 'punctuation';
    suggestions: string[];
}

export { GrammarCheckResult, GrammarError };