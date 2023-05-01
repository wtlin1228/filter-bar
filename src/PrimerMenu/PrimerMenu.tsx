import { ActionMenu, ActionList, Box } from "@primer/react";
import React from "react";

export const PrimerMenu = () => {
  const [isShowMenu1, setIsShowMenu1] = React.useState(false);
  const [isShowMenu2, setIsShowMenu2] = React.useState(false);

  const [isOpenMenu1, setIsOpenMenu1] = React.useState(false);
  const [isOpenMenu2, setIsOpenMenu2] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <ActionMenu>
        <ActionMenu.Button>Menu</ActionMenu.Button>

        <ActionMenu.Overlay>
          <ActionList>
            <ActionList.Item onSelect={(event) => console.log("New file")}>
              New file
            </ActionList.Item>
            <ActionList.Item
              onSelect={() => {
                setIsShowMenu1(true);
                setIsOpenMenu1(true);
              }}
            >
              ShowMenu Menu 1
            </ActionList.Item>
            <ActionList.Item
              onSelect={() => {
                setIsShowMenu2(true);
                setIsOpenMenu2(true);
              }}
            >
              ShowMenu Menu 2
            </ActionList.Item>
            <ActionList.Divider />
            <ActionList.Item variant="danger">Delete file</ActionList.Item>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>

      {isShowMenu1 && (
        <ActionMenu open={isOpenMenu1} onOpenChange={setIsOpenMenu1}>
          <ActionMenu.Button>Menu1</ActionMenu.Button>

          <ActionMenu.Overlay>
            <ActionList>
              <ActionList.Item onSelect={(event) => console.log("New file")}>
                New file
              </ActionList.Item>
              <ActionList.Item>Copy link</ActionList.Item>
              <ActionList.Item>Edit file</ActionList.Item>
              <ActionList.Divider />
              <ActionList.Item
                variant="danger"
                onSelect={() => setIsShowMenu1(false)}
              >
                Close Menu 1
              </ActionList.Item>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      )}

      {isShowMenu2 && (
        <ActionMenu open={isOpenMenu2} onOpenChange={setIsOpenMenu2}>
          <ActionMenu.Button>Menu2</ActionMenu.Button>

          <ActionMenu.Overlay>
            <ActionList>
              <ActionList.Item onSelect={(event) => console.log("New file")}>
                <div>
                  <ul>
                    <li>123</li>
                    <li>456</li>
                    <li>789</li>
                  </ul>
                </div>
              </ActionList.Item>
              <ActionList.Item>Copy link</ActionList.Item>
              <ActionList.Item>Edit file</ActionList.Item>
              <ActionList.Divider />
              <ActionList.Item
                variant="danger"
                onSelect={() => setIsShowMenu2(false)}
              >
                Close Menu 2
              </ActionList.Item>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      )}
    </Box>
  );
};
