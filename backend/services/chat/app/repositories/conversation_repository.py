from uuid import UUID
from sqlalchemy.orm import Session
from app.models.conversation_model import ConversationModel

class ConversationRepository:
    def __init__(self,db : Session):
        self.db = db


    def create_conversation(self,user_id:int, title : str,  ) ->ConversationModel: 
        conversation = ConversationModel(
            user_id =user_id,
            title = title
        )

        self.db.add(conversation)
        self.db.commit()
        self.db.refresh(conversation)

        return conversation

    def get_conservation_id(self, conversation_id : UUID) -> ConversationModel | None:
        return (self.db.query(ConversationModel).filter(ConversationModel.id == conversation_id).first())

    def get_by_userId(self,user_id :int) -> list[ConversationModel]:
        return (self.db.query(ConversationModel).filter(ConversationModel.user_id == user_id).order_by(ConversationModel.updated_at.desc()).all())

    def update_title(self,conversation_id:UUID , title:str)->ConversationModel:
        conversation = self.get_conservation_id(conversation_id)

        if not conversation:
            return None
        conversation.title = title

        self.db.commit()
        self.db.refresh(conversation)
        return conversation


    def delete_conversation(self,conversation_id:UUID)->bool:
        conversation = self.get_conservation_id(conversation_id)

        if not conversation:
            return False

        self.db.delete(conversation)
        self.db.commit()

        return True


    


    

    
