import { ActivatedRoute } from '@angular/router';
import { MessageService } from './message.service';

describe('MessageService', () => {
  describe('Initial state', () => {
    it('messages should be empty', () => {
      // Arrange

      // Act
      const messageService = new MessageService();

      // Assert
      expect(messageService.messages).toEqual([]);
    });
  });

  describe('add', () => {
    it('messages should contain the new message when calling add after initialising', () => {
      // Arrange
      const messageService = new MessageService();

      // Act
      messageService.add('TEST');

      // Assert
      expect(messageService.messages).toContain('TEST');
    });

    it('messages should also contain the new message when messages contains existing messages', () => {
      // Arrange
      const messageService = new MessageService();
      messageService.messages = ['ExistingMessage'];

      // Act
      messageService.add('TEST');

      // Assert
      expect(messageService.messages.length).toBe(2);
      expect(messageService.messages).toContain('TEST');
    });
  });

  describe('clear', () => {
    it('messages should be empty when calling clear after initialising', () => {
      // Arrange
      const messageService = new MessageService();

      // Act
      messageService.clear();

      // Assert
      expect(messageService.messages).toEqual([]);
    });

    it('messages should be empty after calling clear when messages contains existing message', () => {
      // Arrange
      const messageService = new MessageService();
      messageService.messages = ['test'];

      // Act
      messageService.clear();

      // Assert
      expect(messageService.messages).toEqual([]);
    });
  });
});
