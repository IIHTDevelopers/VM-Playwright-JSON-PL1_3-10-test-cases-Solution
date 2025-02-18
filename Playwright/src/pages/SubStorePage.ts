import { Locator, Page } from "@playwright/test";
import path from "path";

export class SubStorePage {
  readonly page: Page;
  public substore: {
    substoreLink: Locator;
    selectSubstore: Locator;
    inventoryRequisition: Locator;
    inventory: Locator;
  }

  constructor(page: Page) {
    this.page = page;
    this.substore = {
      substoreLink: page.locator('a[href="#/WardSupply"]'),
      selectSubstore: page.locator('(//span[@class="report-name"])[1]'),
      inventoryRequisition: page.locator('a[href="#/WardSupply/Inventory/InventoryRequisitionList"]'),
      inventory: page.locator(`ul.page-breadcrumb a[href="#/WardSupply/Inventory"]`),
    }
  }

  /**
     * @Test6
     * @description This method navigates to the Inventory Requisition section, captures a screenshot of the page, 
     *              and saves it in the screenshots folder.
     * @expected
     * Screenshot of the page is captured and saved successfully.
     */
  async captureInventoryRequisitionScreenshot() {
    // Write your logic here
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const screenshotPath = path.join(__dirname, `../screenshots/inventory-requisition-${timestamp}.png`);

    await this.substore.substoreLink.click();

    await this.substore.selectSubstore.click();

    await this.substore.inventory.click();

    // Click on the Inventory Requisition section
    await this.substore.inventoryRequisition.click();
    expect(this.page.url()).toContain("Inventory/InventoryRequisitionList");

    // Take a screenshot of the current page
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
  }
}
