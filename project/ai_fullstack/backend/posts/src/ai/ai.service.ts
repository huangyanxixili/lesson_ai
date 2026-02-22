import {
    Injectable
} from '@nestjs/common';
import type { Message } from './dto/chat.dto'
import { ChatDeepSeek } from '@langchain/deepseek'

@Injectable()
export class AIService{
    private chatModule: ChatDeepSeek; // llm 成为service 一个私有属性
    constructor() {

    }

    async chat(messages: Message[], onToken: (token: string) => void) {

    }
}