import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

export default function ReceivedInvitationsDropdown({
  onActionSelected,
  subject
}: {
  onActionSelected: (action: { type: 'accept' | 'reject', userId: string }) => void;
  subject: any;
}) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          size="sm"
        >
          Выберите действие
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" className="text-black">
        <DropdownItem
          key="accept"
          onPress={() => {
            onActionSelected({
              type: 'accept',
              userId: subject.id
            });
          }}
        >
          Подтвердить
        </DropdownItem>
        <DropdownItem
          key="reject"
          onPress={() => {
            onActionSelected({
              type: 'reject',
              userId: subject.id
            });
          }}
        >
          Отменить
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}