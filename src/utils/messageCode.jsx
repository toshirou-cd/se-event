
{
    public class MessageCode
    {
        /// <summary>
        /// U111 : user not found or deleted
        /// </summary>
        public const String UserNotFound = "U111";
        /// <summary>
        /// U112 : user info for add invalid
        /// </summary>
        public const String AddUserInfoNotValid = "U112";
        /// <summary>
        /// U113 : user email exist
        /// </summary>
        public const String UserEmailExist = "U113";
        /// <summary>
        /// U114 : add user fail
        /// </summary>
        public const String AddUserFail = "U114";
        /// <summary>
        /// U115 : user account inactivated
        /// </summary>
        public const String UserAccountInActivated = "U115";
        /// <summary>
        /// U116 : user account has been deleted
        /// </summary>
        public const String UserAccountDeleted = "U116";
        /// <summary>
        /// U117 : user storage not found
        /// </summary>
        public const String UserStorageNotFound = "U117";
        /// <summary>
        /// U120 : user name exist
        /// </summary>
        public const String UserNameExist = "U120";
        /// <summary>
        /// U118 : user mail not found
        /// </summary>
        public const String UserMailNotFound = "U118";
        /// <summary>
        /// U119 : reset password for user fail
        /// </summary>
        public const String ResetPassWordForUserFail = "U119";
        /// <summary>
        /// U121 : user use old password
        /// </summary>
        public const String OldPassWord = "U121";
        /// <summary>
        /// U122 : update user fail
        /// </summary>
        public const String UpdateUserFail = "U122";
        /// <summary>
        /// U123 : change password fail
        /// </summary>
        public const String ChangePassWordFail = "U123";
        /// <summary>
        /// U124 : user password incorrect
        /// </summary>
        public const String UserPassWordInCorrect = "U124";
        /// <summary>
        /// U125 : get user detail fail
        /// </summary>
        public const String GetUserDetailFail = "U125";
        /// <summary>
        /// U126 : get more user post fail
        /// </summary>
        public const String GetMoreUserPostFail = "U126";
        /// <summary>
        /// U127 : get user account fail
        /// </summary>
        public const String GetUserAccountFail = "U127";
        /// <summary>
        /// U128 : no user account to display
        /// </summary>
        public const String NoUserAccountToDisplay = "U128";
        /// <summary>
        /// U129 : delete account fail
        /// </summary>
        public const String DeleteAccountFail = "U129";
        /// <summary>
        /// P111 : post not found
        /// </summary>
        public const String PostNotFound = "P111";
        /// <summary>
        /// P112 : No post to display
        /// </summary>
        public const String NoPostToDisplay = "P112";
        /// <summary>
        /// P113 : get post fail
        /// </summary>
        public const String GetPostFail = "P113";
        /// <summary>
        /// UP111 : upload file fail due to some error
        /// </summary>
        public const String UpLoadFileFail = "UP111";
        /// <summary>
        /// IMG111 : image not found
        /// </summary>
        public const String ImgNotFound = "IMG111";
        /// <summary>
        /// IMG112 : get image error in AWSS3FileService.cs
        /// </summary>
        public const String GetImgError = "IMG112";
        /// <summary>
        /// ALB111 : user has no album
        /// </summary>
        public const String AlbumNotFound = "ALB111";
        /// <summary>
        /// ALB112 : get album fail
        /// </summary>
        public const String GetAlbumFail = "ALB112";
        /// <summary>
        /// ALB113 : add album fail
        /// </summary>
        public const String AddAlbumFail = "ALB113";
        /// <summary>
        /// ALB114 : album name is duplicated
        /// </summary>
        public const String AlbumNameIsDuplicated = "ALB114";
        /// <summary>
        /// ALB115 : update album fail
        /// </summary>
        public const String UpdateAlbumFail = "ALB115";
        /// <summary>
        /// ALB116 : delete album fail
        /// </summary>
        public const String DeleteAlbumFail = "ALB116";
        /// <summary>
        /// P114 : add post infor not valid
        /// </summary>
        public const String AddPostInforNotValid = "P114";
        /// <summary>
        /// P115 : add post fail
        /// </summary>
        public const String AddPostFail = "P115";
        /// <summary>
        /// P116 : update post fail
        /// </summary>
        public const String UpdatePostFail = "P116";
        /// <summary>
        /// P117 : delete post fail
        /// </summary>
        public const String DeletePostFail = "P117";
        /// <summary>
        /// P118 : post not belong to current user
        /// </summary>
        public const String PostNotBelong = "P118";
        /// <summary>
        /// P119 : post not belong to current contest
        /// </summary>
        public const String PostNotBelongInCurrentContest = "P119";
        /// <summary>
        /// CT111 : contest not found
        /// </summary>
        public const String ContestNotFound = "CT111";
        /// <summary>
        /// CT112 : Contest name is duplicated
        /// </summary>
        public const String ContestNameIsDuplicated = "CT112";
        /// <summary>
        /// CT113 : get list of contest fail
        /// </summary>
        public const String GetContestFail = "CT113";
        /// <summary>
        /// CT114 : delete contest fail
        /// </summary>
        public const String DeleteContestFail = "CT114";
        /// <summary>
        /// CT115 : add contest fail
        /// </summary>
        public const String AddContestFail = "CT115";
        /// <summary>
        /// CT116 : update contest fail
        /// </summary>
        public const String UpdateContestFail = "CT116";
        /// <summary>
        /// CT117 : No contest to display
        /// </summary>
        public const String NoContestToDisplay = "CT117";
        /// <summary>
        /// CT118 : Active contest manually fail
        /// </summary>
        public const String ActiveContestManuallyFail = "CT118";
        /// <summary>
        /// CT119 : Extend duartion delayed fail
        /// </summary>
        public const String ExtendDurationDelayedFail = "CT119";
        /// <summary>
        /// CT120 : No user in contest
        /// </summary>
        public const String ContestHasNoParticipater = "CT120";
        /// <summary>
        /// CT121 : get user in contest fail
        /// </summary>
        public const String GetUserInContestFail = "CT121";
        /// <summary>
        /// CT122 : contest must have prize
        /// </summary>
        public const String ContestMustHavePrize = "CT122";
        /// <summary>
        /// JO111 : job id is required to delete it
        /// </summary>
        public const String JobIdRequired = "JO111";
        /// <summary>
        /// CM111 : get comment fail
        /// </summary>
        public const String GetCommentFail = "CM111";
        /// <summary>
        /// CM112 : add comment fail
        /// </summary>
        public const String AddCommentFail = "CM112";
        /// <summary>
        /// CM113 : comment not found
        /// </summary>
        public const String CommentNotFound = "CM113";
        /// <summary>
        /// CM114 : delete commment fail
        /// </summary>
        public const String DeleteCommentFail = "CM114";
        /// <summary>
        /// CM115 : no comment to didplay
        /// </summary>
        public const String NoCommentToDisplay = "CM115";
        /// <summary>
        /// CM116 : comment not belong to current user
        /// </summary>
        public const String CommentNotBelong = "CM116";
        /// <summary>
        /// LK111 : user has liked this post
        /// </summary>
        public const String LikeExist = "LK111";
        /// <summary>
        /// LK112 : add like fail
        /// </summary>
        public const String AddLikeFail = "LK112";
        /// <summary>
        /// LK113 : like not exist
        /// </summary>
        public const String LikeNotExist = "LK113";
        /// <summary>
        /// LK114 : delete like fail
        /// </summary>
        public const String DeleteLikeFail = "LK114";
        /// <summary>
        /// FL111 : user has followed this user
        /// </summary>
        public const String FollowExist = "FL111";
        /// <summary>
        /// FL112 : add follow fail
        /// </summary>
        public const String AddFollowFail = "FL112";
        /// <summary>
        /// FL113 : follow not exist
        /// </summary>
        public const String FollowNotExist = "FL113";
        /// <summary>
        /// FL114 : delete follow fail
        /// </summary>
        public const String DeleteFollowFail = "FL114";
        /// <summary>
        /// CC111 : generate confirm code fail
        /// </summary>
        public const String GenerateConfirmCodeFail = "CC111";
        /// <summary>
        /// CC112 : validate confirm code fail
        /// </summary>
        public const String ValidateConfirmCodeFail = "CC112";
        /// <summary>
        /// CC113 : regenerate confirm code fail
        /// </summary>
        public const String ReGenerateConfirmCodeFail = "CC113";
        /// <summary>
        /// UC111 : user confirm code is not found
        /// </summary>
        public const String CodeNotFound = "UC111";
        /// <summary>
        /// UC112 : code is expired
        /// </summary>
        public const String CodeIsExpired = "UC112";
        /// <summary>
        /// UC113 : activation fail
        /// </summary>
        public const String ActivationFail = "UC113";
        /// <summary>
        /// PR111 : post reference exist
        /// </summary>
        public const String PostReferenceExist = "PR111";
        /// <summary>
        /// PR112 : add post reference fail
        /// </summary>
        public const String AddReferencePostFail = "PR112";
        /// <summary>
        /// PR113 : user want to save their own post
        /// </summary>
        public const String PostReferenceBelongtoRequestUser = "PR113";
        /// <summary>
        /// RP111 : add report fail
        /// </summary>
        public const String AddReportFail = "RP111";
        /// <summary>
        /// RP112 : no report available
        /// </summary>
        public const String NoReportAvailable = "RP112";
        /// <summary>
        /// RP113 : report delete or not exist
        /// </summary>
        public const String ReportNotFound = "RP113";
        /// <summary>
        /// RP114 : update report fail
        /// </summary>
        public const String UpdateReportFail = "RP114";
        /// <summary>
        /// RP113 : get report error
        /// </summary>
        public const String GetReportError = "RP113";
        /// <summary>
        /// NT111 : no notification to display
        /// </summary>
        public const String NoNotificationToDisplay = "NT111";
        /// <summary>
        /// NT112 : get notification fail
        /// </summary>
        public const String GetNotificationFail = "NT112";
        /// <summary>
        /// NT113 : add notification fail
        /// </summary>
        public const String AddNotificationFail = "NT113";
        /// <summary>
        /// B112 : book is deleted
        /// </summary>
        public const String BookDelete = "B112";
        /// <summary>
        /// B113 : get book fail
        /// </summary>
        public const String GetBookFail = "B113";
        /// <summary>
        /// B114 : book's author or publisher duplicated
        /// </summary>
        public const String BookInforDuplicated = "B114";
        /// <summary>
        /// S111 : search is failed
        /// </summary>
        public const String SearchFail = "S111";
        /// <summary>
        /// S112 : string contain search value is null or white space
        /// </summary>
        public const String StringSearchFail = "S112";
        /// <summary>
        /// S113 : Product Per Page of Current Page is blank or zero
        /// </summary>
        public const String IntIsBlank = "S113";
        /// <summary>
        /// TA111 : wrong type or action to enter api
        /// </summary>
        public const String WrongTypeOrAction = "TA111";
        /// <summary>
        /// D111 : date is invalid
        /// </summary>
        public const String WrongFormatForDate = "D111";
        /// <summary>
        /// C111 : get category fail
        /// </summary>
        public const String GetCategoryFail = "C111";
        /// <summary>
        /// C112 : category not found or deleted
        /// </summary>
        public const String CategoryNotFound = "C112";
        /// <summary>
        /// C113 : update category fail
        /// </summary>
        public const String UpdateCategoryFail = "C113";
        /// <summary>
        /// C114 : category exist
        /// </summary>
        public const String CategoryExist = "C114";
        /// <summary>
        /// C115 : add category fail
        /// </summary>
        public const String AddCategoryFail = "C115";
        /// <summary>
        /// CV111 : conversation not found
        /// </summary>
        public const String ConversationNotFound = "CV111";
        /// <summary>
        /// CV112 : no conversation to display
        /// </summary>
        public const String NoConversationToDisplay = "CV112";
        /// <summary>
        /// CV113 : get conversation fail
        /// </summary>
        public const String GetConversationFail = "CV113";
        /// <summary>
        /// MS111 : get message fail
        /// </summary>
        public const String GetMessageFail = "MS111";
        /// <summary>
        /// MS112 : No message to display
        /// </summary>
        public const String NoMessageToDisplay = "MS112";
        /// <summary>
        /// MS113 : Send message fail
        /// </summary>
        public const String SendMessageFail = "MS113";
        /// <summary>
        /// MS114 : Message not found
        /// </summary>
        public const String MessageNotFound = "MS114";
        /// <summary>
        /// MS115 : update message fail
        /// </summary>
        public const String UpdateMessageFail = "MS115";
        /// <summary>
        /// R111 : Role not found or deleted
        /// </summary>
        public const String RoleNotFoundOrDeleted = "R111";
        /// <summary>
        /// DU111 : Duplicated but has been deleted
        /// </summary>
        public const String DuplicateButDelete = "DU111";
        /// <summary>
        /// DU112 : Duplicated
        /// </summary>
        public const String Duplicate = "DU112";
        /// <summary>
        /// R111 : Add role fail
        /// </summary>
        public const String AddRoleFail = "R111";
        /// <summary>
        /// R112 : Update role fail
        /// </summary>
        public const String UpdateRoleFail = "R112";
        /// <summary>
        /// R113 : role not valid
        /// </summary>
        public const String RoleNotValid = "R113";
        /// <summary>
        /// R114 : no role to display
        /// </summary>
        public const String NoRoleToDisplay = "R114";
        /// <summary>
        /// R115 : get role fail
        /// </summary>
        public const String GetRoleFail = "R115";
        /// <summary>
        /// S113 : string contain name value is null or white space
        /// </summary>
        public const String StringNameFail = "S113";
        /// <summary>
        /// F111 : File PDF, Image or watermark name in request is null
        /// </summary>
        public const String FileOrNameIsNull = "F111";
        /// <summary>
        /// SE111 : Send Email Fail
        /// </summary>
        public const String SendEmailFail = "SE111";
        /// <summary>
        /// EM111 : email format not valid
        /// </summary>
        public const String EmailFormatInvalid = "EM111";
        /// <summary>
        /// ST111 : Wrong type of status
        /// </summary>
        public const String WrongTypeStatus = "ST111";
        /// <summary>
        /// TK111 : Jwt token is not expired
        /// </summary>
        public const String TokenIsNotExpired = "TK111";
        /// <summary>
        /// TK112 : refresh token is not existed
        /// </summary>
        public const String RefreshTokenNotExisted = "TK112";
        /// <summary>
        /// TK113 : token expired
        /// </summary>
        public const String TokenExpired = "TK113";
        /// <summary>
        /// TK114 : token role not valid
        /// </summary>
        public const String TokenRoleNotValid = "TK114";
        /// <summary>
        /// TK115 : refresh token expired
        /// </summary>
        public const String RefreshTokenExpired = "TK115";
        /// <summary>
        /// TK116 : jwt token not match refresh token
        /// </summary>
        public const String JwtTokenNotMatchRefreshToken = "TK116";
        /// <summary>
        /// TK117 : refresh token fail
        /// </summary>
        public const String RefreshTokenFail = "TK117";
        /// <summary>
        /// TK118 : generate new jwt token fail
        /// </summary>
        public const String GenerateNewTokenFail = "TK118";
        /// <summary>
        /// TK119 : refresh token not found
        /// </summary>
        public const String TokenNotFound = "TK119";
        /// <summary>
        /// TK120 : delete refresh token fail
        /// </summary>
        public const String DeleteTokenFail = "TK120";
        /// <summary>
        /// TK121 : token invalid
        /// </summary>
        public const String TokenInvalid = "TK121";
        /// <summary>
        /// LG111 : login fail
        /// </summary>
        public const String loginFail = "LG111";
        /// <summary>
        /// FO111 : force logout fail
        /// </summary>
        public const String ForceLogoutFail = "FO111";
        /// <summary>
        /// HS111 : add search user to history fail
        /// </summary>
        public const String AddUserToHistoryFail = "HS111";
        /// <summary>
        /// HS112 : user not found in history
        /// </summary>
        public const String HistoryNotFound = "HS112";
        /// <summary>
        /// HS113 : Delete search history fail
        /// </summary>
        public const String DeleteSearchHistoryFail = "HS113";
        /// <summary>
        /// HS114 : No search history to display
        /// </summary>
        public const String NoSearchHistoryToDisplay = "HS114";
        /// <summary>
        /// HS115 : Get search history fail
        /// </summary>
        public const String GetSearchHistoryFail = "HS115";
        /// <summary>
        /// HS116 : Get more search history fail
        /// </summary>
        public const String GetMoreSearchHistoryFail = "HS116";
        /// <summary>
        /// W111 : Calculate weight fail
        /// </summary>
        public const String CalculateWeightFail = "W111";
        /// <summary>
        /// P120 : In single contest user can not post more than 1 post
        /// </summary>
        public const String DuplicatePostInContest = "P120";
        /// <summary>
        /// U130 : user has been block by admin
        /// </summary>
        public const String UserIsBlock = "U130";
        /// <summary>
        /// PZ111 : add prize fail
        /// </summary>
        public const String AddPrizeFail = "PZ111";
        /// <summary>
        /// PZ112 : prize name is duplicated
        /// </summary>
        public const String PrizeNameIsDuplicated = "PZ112";
        /// <summary>
        /// PZ113 : prize not found
        /// </summary>
        public const String PrizeNotFound = "PZ113";
        /// <summary>
        /// PZ114 : prize is used in existed contest
        /// </summary>
        public const String PrizeIsUsedInExistedContest = "PZ114";
        /// <summary>
        /// PZ115 : update prize fail
        /// </summary>
        public const String UpdatePrizeFail = "PZ115";
        /// <summary>
        /// PZ116 : no prize to display
        /// </summary>
        public const String NoPrizeToDisplay = "PZ116";
        /// <summary>
        /// PZ117 : get prize fail
        /// </summary>
        public const String GetPrizeFail = "PZ117";
        /// <summary>
        /// EV111 : date start for join event is smaller datetime now or is too close to date time now
        /// </summary>
        public const String WrongFormatForDateStartJoin = "EV111";
        /// <summary>
        /// EV112 : date end for join event is smaller date start join or is too close to date start join
        /// </summary>
        public const String WrongFormatForDateEndJoin = "EV112";
        /// <summary>
        /// EV113 : date start event is smaller date end for join event or is too close to date end for join event
        /// </summary>
        public const String WrongFormatForDateStartEvent = "EV113";
        /// <summary>
        /// EV114 : date end event is smaller date start event or is too close to date start event
        /// </summary>
        public const String WrongFormatForDateEndEvent = "EV114";
        /// <summary>
        /// F112 : file type is not excel
        /// </summary>
        public const String FileTypeIsWrong = "F112";
        /// <summary>
        /// EV111 : event not found
        /// </summary>
        public const String EventNotFound = "EV111";
        /// <summary>
        /// EV112 : no event to display
        /// </summary>
        public const String NoEventToDisplay = "EV112";
        /// <summary>
        /// EV113 : get event fail
        /// </summary>
        public const String GetEventFail = "EV113";
        /// <summary>
        /// EV114 : update event fail
        /// </summary>
        public const String UpdateEventFail = "EV114";
        /// <summary>
        /// EV115 : delete event fail
        /// </summary>
        public const String DeleteEventFail = "EV115";
        /// <summary>
        /// EV116 : add event fail
        /// </summary>
        public const String AddEventFail = "EV116";
        /// <summary>
        /// EV117 : even plan not found
        /// </summary>
        public const String EventPlanNotFound = "EV117";
        /// <summary>
        /// EV118 : even name is duplicated
        /// </summary>
        public const String EventNameIsDuplicated = "EV118";
        /// <summary>
        /// ER111 : event request exist
        /// </summary>
        public const String EventRequestExist = "ER111";
        /// <summary>
        /// ER112 : add event request fail
        /// </summary>
        public const String AddEventRequestFail = "ER112";
        /// <summary>
        /// ER113 : no event request available
        /// </summary>
        public const String NoEventRequestAvailable = "ER113";
        /// <summary>
        /// ER114 : get event request fail
        /// </summary>
        public const String GetEventRequestFail = "ER114";
        /// <summary>
        /// ER115 : event request not found
        /// </summary>
        public const String EventRequestNotFound = "ER115";
        /// <summary>
        /// ER116 : update event request fail
        /// </summary>
        public const String UpdateEventRequestFail = "ER116";
        /// <summary>
        /// EC111 : Add event content fail
        /// </summary>
        public const String AddEventContentFail = "EC111";
        /// <summary>
        /// EC112 : event content not found
        /// </summary>
        public const String EventContentNotFound = "EC112";
        /// <summary>
        /// EC113 : delete event content fail
        /// </summary>
        public const String DeleteEventContentFail = "EC113";
        /// <summary>
        /// UE111 : add user event fail
        /// </summary>
        public const String AddUserEventFail = "UE111";
        /// <summary>
        /// UE112 : user event not found
        /// </summary>
        public const String UserEventNotFound = "UE112";
        /// <summary>
        /// UE113 : delete user event not found
        /// </summary>
        public const String DeleteUserEventFail = "UE113";
        /// <summary>
        /// EV119 : request add group event not contain any event
        /// </summary>
        public const String NoEventInRequest = "EV119";
        /// <summary>
        /// GV111 : group event name is duplicated
        /// </summary>
        public const String GroupEventNameDuplicated = "GV111";
        /// <summary>
        /// GV112 : add group event fail
        /// </summary>
        public const String AddGroupEventFail = "GV112";
        /// <summary>
        /// GV113 : group event not found
        /// </summary>
        public const String GroupEventNotFound = "GV113";
        /// <summary>
        /// F113 : file content is empty
        /// </summary>
        public const String FileContentIsEmpty = "F113";
        /// <summary>
        /// GV114 : no group event to display
        /// </summary>
        public const String NoGroupEventToDisplay = "GV114";
        /// <summary>
        /// GV115 : get group event fail
        /// </summary>
        public const String GetGroupEventFail = "GV115";
        /// <summary>
        /// GV116 : update group event fail
        /// </summary>
        public const String UpdateGroupEventFail = "GV116";
        /// <summary>
        /// GV117 : delete group event fail
        /// </summary>
        public const String DeleteGroupEventFail = "GV117";
        /// <summary>
        /// ER117 : add group event request fail
        /// </summary>
        public const String AddGroupEventRequestFail = "ER117";
        /// <summary>
        /// UE114 : get user event fail
        /// </summary>
        public const String GetListUserEventFail = "UE114";
        /// <summary>
        /// UE115 : no user event to display
        /// </summary>
        public const String NoUserEventToDisplay = "UE115";

    }
}