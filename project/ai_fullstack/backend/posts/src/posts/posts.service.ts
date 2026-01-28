import { 
    Injectable 
} from '@nestjs/common';

@Injectable()
export class PostsService {
    constructor() {

    }

    async findAll() {
        return {
            items: []
        }
    }
}