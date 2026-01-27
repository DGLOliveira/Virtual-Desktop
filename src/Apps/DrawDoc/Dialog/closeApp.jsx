export const dialogCloseApp = (setCanClose, setAction, setAppDialog) => {
    
      setAppDialog({
        title: "Warning",
        info: "Do you want to download the file before closing?",
        actions: {
          Save: () => {
            setAction("Save and Close");
            setAppDialog(null);
          },
          Close: () => {
            setCanClose(true);
            setAppDialog(null);
          },
          Cancel: () => {
            setAppDialog(null);
            setAction(false);
          }
        }
      });
}