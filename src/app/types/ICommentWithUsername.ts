import IComment from "./IComment";

interface ICommentWithUsername extends IComment {
    // profiles: { username: string }[]; // 1:1 관계이지만, 이렇게 작성하지 않으면 TS 에러뜸 이유찾아봐야함
    profiles: any;
}

export default ICommentWithUsername;
