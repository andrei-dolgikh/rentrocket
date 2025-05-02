import { FlatUserRoles } from "@/types/user.types";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

export default function UserTableActionsDropnown({
    setSelectedUserId,
    setSelectedUserRole,
    setIsAddUserConformationOpen,
    setIsDeleteUserConformationOpen,
    subject
  }: {
    setSelectedUserId: (id: string) => void;
    setSelectedUserRole: (role: FlatUserRoles) => void;
    setIsAddUserConformationOpen: (isOpen: boolean) => void;
    setIsDeleteUserConformationOpen: (isOpen: boolean) => void;
    subject: any;
  }) {
    return (
        <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            size="sm"
          >
            Управление
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" className="text-black">
          <DropdownItem
            key="add-renter"
            onPress={() => {
              setSelectedUserId(subject.id);
              setSelectedUserRole(FlatUserRoles.renter);
              setIsAddUserConformationOpen(true);
            }}
          >
            Добавить как арендатора
          </DropdownItem>
          <DropdownItem
            key="add-manager"
            onPress={() => {
              setSelectedUserId(subject.id);
              setSelectedUserRole(FlatUserRoles.manager);
              setIsAddUserConformationOpen(true);
            }}
          >
            Добавить как менеджера
          </DropdownItem>
          <DropdownItem
            key="add-owner"
            onPress={() => {
              setSelectedUserId(subject.id);
              setSelectedUserRole(FlatUserRoles.owner);
              setIsAddUserConformationOpen(true);
            }}
          >
            Добавить как владельца
          </DropdownItem>
          <DropdownItem
            key="remove-renter"
            className="text-danger"
            color="danger"
            onPress={() => {
              setSelectedUserId(subject.id);
              setSelectedUserRole(FlatUserRoles.renter);
              setIsDeleteUserConformationOpen(true);
            }}
          >
            Удалить из арендаторов
          </DropdownItem>
          <DropdownItem
            key="remove-manager"
            className="text-danger"
            color="danger"
            onPress={() => {
              setSelectedUserId(subject.id);
              setSelectedUserRole(FlatUserRoles.manager);
              setIsDeleteUserConformationOpen(true);
            }}
          >
            Удалить из менеджеров
          </DropdownItem>
          <DropdownItem
            key="remove-owner"
            className="text-danger"
            color="danger"
            onPress={() => {
              setSelectedUserId(subject.id);
              setSelectedUserRole(FlatUserRoles.owner);
              setIsDeleteUserConformationOpen(true);
            }}
          >
            Удалить из владельцев
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
}