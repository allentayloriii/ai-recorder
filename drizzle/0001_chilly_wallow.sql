ALTER TABLE `notes` ADD `note_text` text;--> statement-breakpoint
UPDATE `notes` SET `note_text` = `notes_text`;--> statement-breakpoint
ALTER TABLE `notes` DROP COLUMN `notes_text`;