# README
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false, index: true|
### Association
- has_many :messages
- has_many :groups,though: :users_groups
- has_many :user_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :users_groups
- has_many :users,though: :users_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|group|references|null: false,foreign_key: true|
|user|references|null: false,foreign_key: true|
|image|string||
### Association
- belongs_to :user
- belongs_to :group

## user_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false,foreign_key: true|
|group|references|null: false,foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
