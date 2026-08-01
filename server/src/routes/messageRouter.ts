import {Router} from "express";
import { protect } from "../middleware/authMiddileware";
import { validate } from "../middleware/validation";
import { checkConversation, deleteMessage, getConversationMessages, sendMessage } from "../controllers/messageController";
import { createMessageSchema, deleteMessageSchema, getConversationMessagesSchema } from "../validators/messageValidator";
import { getUserInbox } from "../models/messageModel";


const router = Router();

router.get("/conversation/:listingId",protect,checkConversation);
router.post("/send",protect,validate(createMessageSchema), sendMessage);
router.delete("/delete/:messageId", protect,validate(deleteMessageSchema), deleteMessage);

router.get("/inbox", protect,getUserInbox);
router.get("/conversation/:conversationId", protect, validate(getConversationMessagesSchema), getConversationMessages);